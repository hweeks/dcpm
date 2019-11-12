import {
  GraphQLObjectType
} from "graphql";
import { UserInfoInputType, UserInfoType } from "../models/user";
import { BlobInfoType, BlobInfoInputType } from "../models/blob";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    user: {
      type: UserInfoType,
      args: {
        userInput: {
          type: UserInfoInputType
        }
      },
      resolve (...args) {
        debugger
      }
    },
    blob: {
      type: BlobInfoType,
      args: {
        userInput: {
          type: BlobInfoInputType
        }
      },
      resolve (...args) {
        debugger
      }
    },
  }
});
