import mongoose from "mongoose";
import { Response, Request } from "express";
import { createUser } from "../../lib/routes/user";
import { startMongoose } from "../../lib/server/db";

describe('User', () => {
  let db : typeof mongoose
  beforeAll(async () => {
    db = await startMongoose(global.__MONGO_URI__)
  })
  afterAll(async() => {
    await db.connection.db.dropDatabase()
    await db.connection.close()
  })
  test('creates a user', async () => {
    const body = {
      username: 'user',
      password: 'password'
    }
    const send = jest.fn()
    const fakeRes = {send} as unknown as Response
    const fakeReq = {body} as unknown as Request
    const fakeNext = jest.fn()
    await createUser(fakeReq, fakeRes, fakeNext)
    expect(fakeRes.send).toHaveBeenCalledTimes(1)
    expect(fakeNext).toHaveBeenCalledTimes(0)
  })
  test('does not create a user', async () => {
    const body = {
      user: 'user',
      password: 'password'
    }
    const send = jest.fn()
    const fakeRes = {send} as unknown as Response
    const fakeReq = {body} as unknown as Request
    const fakeNext = jest.fn()
    await createUser(fakeReq, fakeRes, fakeNext)
    expect(fakeRes.send).toHaveBeenCalledTimes(0)
    expect(fakeNext).toHaveBeenCalledTimes(1)
  })
})
