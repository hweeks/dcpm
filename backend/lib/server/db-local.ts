import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: any

export const gimme_dat_local_db_uri = async (): Promise<string> => {
  if (!mongod) mongod = await MongoMemoryServer.create();
  return  mongod.getUri();
}
