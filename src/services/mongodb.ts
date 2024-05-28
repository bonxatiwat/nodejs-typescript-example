import { MongoClient } from "mongodb";

const MONGODB_URI =
  process.env.MONGODB_URI ?? "mongodb://root:123456@0.0.0.0:27017";

export const mongoClient = new MongoClient(MONGODB_URI);

export enum MongoDatabeses {
  RESAPI = "resapi"
}

enum MongoResApiCollections {
  CALCULATORS = "calculators"
}

export const MongoCollections = {
  [MongoDatabeses.RESAPI]: MongoResApiCollections
};
