import express, {Application} from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { addGraphLayer } from "../schema/middleware";

const startMongoose = async () => {
  let url = "mongodb://mongo:27017/dcpm"
  let connection = await mongoose.connect(url, { useNewUrlParser: true, keepAlive: true, connectTimeoutMS: 30000 });
  if (process.env.CLEAR_ALL_DATA) {
    connection.connection.db.dropDatabase();
    connection = await mongoose.connect(url, { useNewUrlParser: true });
  }
  return connection;
};

const buildAndReturnApp = async (app : Application) => {
  app.use(helmet())
  await startMongoose()
  addGraphLayer(app)
  app.listen(3000)
  return app
}

buildAndReturnApp(express())
