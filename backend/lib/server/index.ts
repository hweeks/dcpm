import express, {Application, Request, Response, NextFunction} from "express";
import uuid from 'uuid/v4';
import bodyParser from 'body-parser'
import helmet from "helmet";
import { startMongoose } from './db'
import { UserRouter } from "../routes/user";
import { BlobRouter } from "../routes/blob";
import { SearchRouter } from "../routes/search";
import { logger } from "./log";

export interface DcpmRequest extends Request {
  tid?: string
}

const addTracing = (request : DcpmRequest, response: Response, next: NextFunction) => {
  request.tid = uuid()
  next()
}

const buildAndReturnApp = async (app : Application) => {
  logger.debug('Starting dcpm')
  app.use(helmet())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(addTracing)
  logger.debug('middlewares added')
  await startMongoose()
  logger.debug('mongoose started')
  app.use('/', UserRouter)
  logger.debug('user routes added')
  app.use('/', BlobRouter)
  logger.debug('blob routes added')
  app.use('/', SearchRouter)
  logger.debug('search routes added')
  app.use('*', (error: Error, req: Request, res: Response, next: NextFunction) => {
    const {message} = error
    logger.error({err: error, req, message: 'Thrown in default error catcher'})
    res.status(500).send({message})
    next()
  })
  app.listen(3000)
  logger.debug('dcpm started!')
  return app
}

buildAndReturnApp(express())
