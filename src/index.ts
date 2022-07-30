import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv-safe/config';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';
import cors from 'cors';
export const prisma = new PrismaClient();

async function main() {
  const app = express();
  app.use(cors());
  const appolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],

    context: ({ req, res }): MyContext => ({
      req,
      res,
    }),
  });
  await appolloServer.start();

  appolloServer.applyMiddleware({
    app,
  });
  app.listen(4222, () => console.log('app listen to localhost:4000'));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
