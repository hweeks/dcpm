import { Document, Schema, Model, model } from "mongoose";
import bcrypt from 'bcrypt'
import {promisify} from 'util'
import { Request, Response, Router, NextFunction } from "express";
import jws from 'jws';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  blobs: {
    type: Array,
  }
});

export interface IUserDoc extends Document {
  id?: string;
  token?: string;
  username: string;
  password: string;
  blobs?: string[];
}

UserSchema.statics.authenticate = async (username: string, password: string) => {
  let foundUser : IUserDoc
  foundUser = await User.findOne({username}) as IUserDoc
  if (!foundUser) {
    throw new Error(`There's no one by the handle ${username} here. Odd...`)
  }
  const isCorrect = await bcrypt.compare(password, foundUser.password)
  if (!isCorrect) {
    throw new Error('Looks like you may have forgotten your password...')
  }
  return foundUser

};

UserSchema.pre("save", function (next) {
  const userModel = this as IUserDoc
  if (!userModel.isModified('password')) {
    next()
    return
  }
  bcrypt.hash(userModel.password, 10).then((hash) => {
    userModel.password = hash
    next()
  })
});

export const User = model<IUserDoc, Model<IUserDoc>>("User", UserSchema);
const router = Router();

const createToken = async (password: string) => {
  return jws.sign({
    header: { alg: 'HS256' },
    payload: password,
    secret: 'has a van',
  });
}

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body
  try {
    await UserSchema.statics.authenticate(username, password)
    const token = await createToken(password)
    res.send({token})
  } catch (error) {
    next(error)
  }
}

router.post('/api/user/login', userLogin)

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body
  try {
    const builtUser = await User.create({username, password})
    const token = await createToken(builtUser.password)
    res.send({token})
  } catch (error) {
    next(error)
  }
}

router.post('/api/user/create', createUser)

export const UserRouter = router
