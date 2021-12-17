import { startMongoose } from "../lib/server/db";
let con: any;

beforeAll(async () => {
  con = await startMongoose();
});

afterAll(async () => {
  await con.disconnect();
});
