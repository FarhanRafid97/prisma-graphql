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
exports.PostResolver = void 0;
const isAuth_1 = require("../middleware/isAuth");
const type_graphql_1 = require("type-graphql");
const index_1 = require("../index");
let PostType = class PostType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PostType.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PostType.prototype, "body", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], PostType.prototype, "authorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], PostType.prototype, "id", void 0);
PostType = __decorate([
    (0, type_graphql_1.ObjectType)()
], PostType);
(0, type_graphql_1.Resolver)();
class PostResolver {
    async createPost(title, body, authorId, { req }) {
        try {
            const post = await index_1.prisma.post.create({
                data: { title, body, authorId: Number(authorId) },
            });
            if (post) {
                req.session.userId = post.id;
            }
            return post;
        }
        catch (error) {
            console.log(error);
        }
    }
}
__decorate([
    (0, type_graphql_1.Mutation)(() => PostType),
    (0, type_graphql_1.UseMiddleware)(isAuth_1.isAuth),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __param(1, (0, type_graphql_1.Arg)('body')),
    __param(2, (0, type_graphql_1.Arg)('authorId')),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map