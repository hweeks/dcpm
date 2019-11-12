import {
  GraphQLObjectType,
} from "graphql";
import { UserInfoType } from "../models/user";
import { BlobInfoType } from "../models/blob";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: UserInfoType,
      resolve (root, args, req) {
        debugger
      }
    },
    blob: {
      type: BlobInfoType,
      resolve ({getBlob}, args, req) {
        debugger
        getBlob()
      }
    },
  }
});
