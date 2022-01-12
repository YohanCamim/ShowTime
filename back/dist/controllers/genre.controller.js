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
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const genre_schema_1 = require("../schemas/genre.schema");
const genre_service_1 = require("../services/genre.service");
const passport_1 = require("@nestjs/passport");
let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    async createGroupe(response, genre) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const newGenre = await this.genreService.create(genre);
            return response.status(common_1.HttpStatus.CREATED).json({ newGenre });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async fetchAll(response) {
        const genres = await this.genreService.readAll();
        return response.status(common_1.HttpStatus.OK).json({ genres });
    }
    async findById(response, id) {
        const genre = await this.genreService.readById(id);
        return response.status(common_1.HttpStatus.OK).json({ genre });
    }
    async update(response, id, genre) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const updatedGenre = await this.genreService.update(id, genre);
            return response.status(common_1.HttpStatus.OK).json({ updatedGenre });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async delete(response, id) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const deletedGenre = await this.genreService.delete(id);
            return response.status(common_1.HttpStatus.OK).json({ deletedGenre });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, genre_schema_1.Genre]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "createGroupe", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, genre_schema_1.Genre]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "delete", null);
GenreController = __decorate([
    (0, common_1.Controller)('genres'),
    __metadata("design:paramtypes", [genre_service_1.GenreService])
], GenreController);
exports.GenreController = GenreController;
//# sourceMappingURL=genre.controller.js.map