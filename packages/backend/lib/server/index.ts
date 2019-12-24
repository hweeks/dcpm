import express, {Application, Request, Response, NextFunction} from "express";
import bodyParser from 'body-parser'
import helmet from "helmet";
import { startMongoose } from './db'
import { UserRouter } from "../routes/user";
import { BlobRouter } from "../routes/blob";
import { SearchRouter } from "../routes/search";

const buildAndReturnApp = async (app : Application) => {
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  await startMongoose()
  app.use('/', UserRouter)
  app.use('/', BlobRouter)
  app.use('/', SearchRouter)
  app.use('*', (error: Error, req: Request, res: Response, next: NextFunction) => {
    const {message} = error
    res.status(500).send({message})
    next()
  })
  app.listen(3000)
  return app
}

buildAndReturnApp(express())
