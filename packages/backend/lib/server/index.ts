import express, {Application} from "express";
import bodyParser from 'body-parser'
import helmet from "helmet";
import { startMongoose } from './db'
import { UserRouter } from "../routes/user";
import { BlobRouter } from "../routes/blob";

const buildAndReturnApp = async (app : Application) => {
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  await startMongoose()
  app.use('/', UserRouter)
  app.use('/', BlobRouter)
  app.listen(3000)
  return app
}

buildAndReturnApp(express())
