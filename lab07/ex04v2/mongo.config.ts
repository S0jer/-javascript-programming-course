import { MongoClient } from "./dependencies.ts";

const client = new MongoClient();

await client.connect({
    db: "AGH",
    tls: false,
    servers: [
      {
        host: "localhost",
        port: 27017,
      },
    ],
    credential: {
      username: "user",
      password: "user",
      db: "AGH",
      mechanism: "SCRAM-SHA-1",
    },
  });

const db = client.database("AGH");

export default db;
