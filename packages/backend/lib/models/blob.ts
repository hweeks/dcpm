import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import { Document, Schema, Model, model } from "mongoose";

const BlobSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  file: {
    type: String,
  }
});

export interface IBlobDoc extends Document {
  name: string;
  file: string;
}

export const BlobInfoType = new GraphQLObjectType({
  name: "BlobInfo",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    file: {
      type: new GraphQLList(GraphQLString)
    }
  }
});

export const BlobInfoInputType = new GraphQLInputObjectType({
  name: "BlobInfoInput",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    file: {
      type: new GraphQLList(GraphQLString)
    }
  }
});

const Blob = model<IBlobDoc, Model<IBlobDoc>>("Blob", BlobSchema);

export default Blob;
