import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import { Document, Schema, Model, model } from "mongoose";

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
  username: string;
  password: string;
  blobs?: string[];
}

UserSchema.statics.authenticate = async () => {
  debugger
};

UserSchema.pre("save", function (next) {
  debugger;
  next()
});

export const UserInfoType = new GraphQLObjectType({
  name: "UserInfo",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    blobs: {
      type: new GraphQLList(GraphQLString)
    }
  }
});

export const UserInfoInputType = new GraphQLInputObjectType({
  name: "UserInfoInput",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    blobs: {
      type: new GraphQLList(GraphQLString)
    }
  }
});

const User = model<IUserDoc, Model<IUserDoc>>("User", UserSchema);

export default User;
