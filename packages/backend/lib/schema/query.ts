import {
  GraphQLObjectType,
} from "graphql";
import { BlobInfoType } from "../models/blob";

export const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    blob: {
      type: BlobInfoType,
      resolve ({getBlob}, args, req) {
        getBlob()
      }
    },
  }
});
