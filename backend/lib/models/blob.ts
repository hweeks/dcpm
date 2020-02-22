import { Document, Schema, Model, model, Types, } from "mongoose";

export const BlobSchema = new Schema({
  owner: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  about: String,
  versions: [
    {
      version: {
        type: String,
        required: true
      },
      file: {
        type: Types.ObjectId,
        required: true
      },
    }
  ],
  scm: {
    type: String,
    required: true
  },
  authors: [
    {
      type: Types.ObjectId,
      ref: 'User'
    }
  ],
  tags: [String]
});

export interface VersionConfig {
  version: string;
  file: Types.ObjectId,
}

export interface IBlobPayload {
  owner: Types.ObjectId,
  name: string,
  about?: string,
  versions: VersionConfig[],
  scm: string,
  authors: Types.ObjectId[],
  tags: string[]
}

export interface IBlobDoc extends Document {
  owner: Types.ObjectId,
  name: string,
  about?: string,
  versions: VersionConfig[],
  scm: string,
  authors: Types.ObjectId[],
  tags: string[]
}

export const Blob = model<IBlobDoc, Model<IBlobDoc>>("Blob", BlobSchema);
