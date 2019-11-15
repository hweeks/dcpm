import { GraphQLSchema } from "graphql";
import { Application } from "express";
import graphqlHTTP from "express-graphql";
import {query} from './query';
import {mutation} from './mutation';
import blob from './transforms/blob'

const schema = new GraphQLSchema({
  query,
  mutation
});

const root  = {...blob}

export const addGraphLayer = (app : Application) => {
  app.post("/api/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false
  }));

  if (process.env.NODE_ENV !== "production") {
    app.get("/api/graphql", graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    }));
  }
}
