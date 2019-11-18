import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'

const connectOpts : mongoose.ConnectionOptions = { useNewUrlParser: true, keepAlive: true, connectTimeoutMS: 30000 }

let url = process.env.MONGO_URL || "mongodb://mongo:27017/dcpm"
let connection : typeof mongoose
let storage : GridFsStorage = new GridFsStorage({ url });
let fileMiddleware : multer.Instance = multer({storage});
let bucket : GridFSBucket

export const startMongoose = async () => {
  connection = await mongoose.connect(url, connectOpts);
  storage = new GridFsStorage({ db: connection });
  fileMiddleware = multer({storage})
  bucket = new GridFSBucket(connection.connection.db, { bucketName: 'blob' });
  if (process.env.CLEAR_ALL_DATA) {
    connection.connection.db.dropDatabase();
    connection = await mongoose.connect(url, connectOpts);
    storage = new GridFsStorage({ db: connection });
    fileMiddleware = multer({storage})
    bucket = new GridFSBucket(connection.connection.db, { bucketName: 'blob' });
  }
  return connection;
};

export {
  connection,
  fileMiddleware,
  storage,
  bucket
}
