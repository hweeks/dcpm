import { Document, Schema, Model, model, HookNextFunction } from "mongoose";
import bcrypt from 'bcrypt'

export const UserSchema = new Schema({
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

UserSchema.pre("save", function (this: IUserDoc, next : HookNextFunction) {
  const userModel = this
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
