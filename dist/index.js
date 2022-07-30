"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const cors_1 = __importDefault(require("cors"));
exports.prisma = new client_1.PrismaClient();
async function main() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    const appolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, user_1.UserResolver, post_1.PostResolver],
            validate: false,
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
        introspection: true,
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });
    await appolloServer.start();
    appolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(process.env.PORT, () => console.log('app listen to localhost:4000'));
}
main()
    .then(async () => {
    await exports.prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await exports.prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=index.js.map