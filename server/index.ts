import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import schema from "./schema"
import createContext from "./context";

const CLIENT_PORT = Number(process.env.CLIENT_LOCALHOST_PORT) || '';
const SERVER_PORT = Number(process.env.SERVER_LOCALHOST_PORT) || '';

const app = express();

const apolloServer = new ApolloServer({
  schema
})

async function startServer() {
  await apolloServer.start();
  app.use(
    "/graphql",
    cors({
      origin: `http://localhost:${CLIENT_PORT}`,
      credentials: true
    }),
    cookieParser(),
    express.json(), // graphql will always respond in JSON
    expressMiddleware(
      apolloServer,
      {
        context: ({ req, res }) => createContext({ req, res })
      })
  )

  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}/graphql`);
  });
}

startServer().then();
