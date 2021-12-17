import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import { logger } from "./log";
import { is_local_dev, is_test } from "../constants";
import { mongo_url } from "./db-local";

const connectOpts: mongoose.ConnectionOptions = { useNewUrlParser: true };

let url: string = mongo_url || "";
let connection: typeof mongoose;
let storage: GridFsStorage = new GridFsStorage({ url });
let fileMiddleware: multer.Multer = multer({ storage });
let bucket: GridFSBucket;
let gfs: Grid.Grid;

export const startMongoose = async (urlOverride?: string) => {
  logger.debug(`Connecting to mongo on ${url}`);
  connection = await mongoose.connect(urlOverride ?? url, connectOpts);
  storage = new GridFsStorage({ db: connection });
  fileMiddleware = multer({ storage });
  bucket = new GridFSBucket(connection.connection.db, { bucketName: "blob" });
  gfs = Grid(connection.connection.db, connection.mongo);
  if (process.env.CLEAR_ALL_DATA) {
    logger.debug(`Resetting mongo on ${url}`);
    connection.connection.db.dropDatabase();
    connection = await mongoose.connect(url, connectOpts);
    storage = new GridFsStorage({ db: connection });
    fileMiddleware = multer({ storage });
    bucket = new GridFSBucket(connection.connection.db, { bucketName: "blob" });
    gfs = Grid(connection.connection.db, connection.mongo);
  }
  logger.info(`Started and created mongo connection on ${url}`);
  return connection;
};

export { connection, fileMiddleware, storage, bucket, gfs };
