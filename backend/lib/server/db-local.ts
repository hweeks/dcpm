import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: any

export let mongo_url = process.env.MONGO_URI

export const gimme_dat_local_db_uri = async (): Promise<string> => {
  if (!mongod) mongod = await MongoMemoryServer.create();
  mongo_url = mongod.getUri() as string;
  return mongo_url
}
