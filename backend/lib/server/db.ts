import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import { logger } from "./log";

const connectOpts : mongoose.ConnectionOptions = { useNewUrlParser: true, keepAlive: true, connectTimeoutMS: 30000 }

let url = process.env.MONGO_URL || "mongodb://mongo:27017/dcpm"
let connection : typeof mongoose
let storage : GridFsStorage = new GridFsStorage({ url });
let fileMiddleware : multer.Instance = multer({storage});
let bucket : GridFSBucket
let gfs : Grid.Grid

export const startMongoose = async (urlOverride?: string) => {
  logger.debug(`Connecting to mongo on ${url}`)
  connection = await mongoose.connect(urlOverride? urlOverride : url, connectOpts);
  storage = new GridFsStorage({ db: connection });
  fileMiddleware = multer({storage})
  bucket = new GridFSBucket(connection.connection.db, { bucketName: 'blob' });
  gfs = Grid(connection.connection.db, connection.mongo)
  if (process.env.CLEAR_ALL_DATA) {
    logger.debug(`Resetting mongo on ${url}`)
    connection.connection.db.dropDatabase();
    connection = await mongoose.connect(url, connectOpts);
    storage = new GridFsStorage({ db: connection });
    fileMiddleware = multer({storage})
    bucket = new GridFSBucket(connection.connection.db, { bucketName: 'blob' });
    gfs = Grid(connection.connection.db, connection.mongo)
  }
  logger.info(`Started and created mongo connection on ${url}`)
  return connection;
};

export {
  connection,
  fileMiddleware,
  storage,
  bucket,
  gfs
}
