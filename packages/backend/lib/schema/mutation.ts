import {
  GraphQLObjectType
} from "graphql";
import { BlobInfoType, BlobInfoInputType } from "../models/blob";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    blob: {
      type: BlobInfoType,
      args: {
        userInput: {
          type: BlobInfoInputType
        }
      },
      resolve (...args) {
      }
    },
  }
});
