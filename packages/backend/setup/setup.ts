import path from 'path'
import fs from 'fs'
import {MongoMemoryServer} from 'mongodb-memory-server'
const globalConfigPath = path.join(__dirname, 'globalConfig.json')
import { startMongoose } from "../lib/server/db";

const mongod : any = new MongoMemoryServer({
  autoStart: false,
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getConnectionString(),
  };
  const mongooseConnect = await startMongoose(mongoConfig.mongoUri)
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod;
  global.__MONGO_CON__ = mongooseConnect.connection;
};