"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const index_1 = require("../index");
let Post = class Post {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Post.prototype, "published", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], Post.prototype, "authorId", void 0);
Post = __decorate([
    (0, type_graphql_1.ObjectType)()
], Post);
let UserType = class UserType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], UserType.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserType.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post]),
    __metadata("design:type", Array)
], UserType.prototype, "posts", void 0);
UserType = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserType);
(0, type_graphql_1.Resolver)();
class UserResolver {
    async allUser({ req }) {
        console.log(req.session.userId);
        return await index_1.prisma.user.findMany({ include: { posts: true } });
    }
    async createUser(email, password, { req }) {
        try {
            const user = await index_1.prisma.user.create({ data: { email, password } });
            if (user) {
                req.session.userId = user.id;
            }
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
    async loginUser(email, password, { req }) {
        try {
            const user = await index_1.prisma.user.findFirstOrThrow({ where: { email } });
            if (!user) {
                return { msg: 'user tida adak' };
            }
            const isValidPassword = user.password === password;
            if (!isValidPassword)
                return { msg: 'password tida adak' };
            req.session.userId = user.id;
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
}
__decorate([
    (0, type_graphql_1.Query)(() => [UserType]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "allUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserType),
    __param(0, (0, type_graphql_1.Arg)('email')),
    __param(1, (0, type_graphql_1.Arg)('password')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserType),
    __param(0, (0, type_graphql_1.Arg)('email')),
    __param(1, (0, type_graphql_1.Arg)('password')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "loginUser", null);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map