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
exports.GroupeController = void 0;
const common_1 = require("@nestjs/common");
const groupe_schema_1 = require("../schemas/groupe.schema");
const groupe_service_1 = require("../services/groupe.service");
const passport_1 = require("@nestjs/passport");
let GroupeController = class GroupeController {
    constructor(groupeService) {
        this.groupeService = groupeService;
    }
    async createGroupe(response, groupe) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const newGroupe = await this.groupeService.create(groupe);
            return response.status(common_1.HttpStatus.CREATED).json({ newGroupe });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async fetchAll(response) {
        const groups = await this.groupeService.readAll();
        return response.status(common_1.HttpStatus.OK).json({ groups });
    }
    async findById(response, id) {
        const group = await this.groupeService.readById(id);
        return response.status(common_1.HttpStatus.OK).json({ group });
    }
    async update(response, id, groupe) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const updatedGroupe = await this.groupeService.update(id, groupe);
            return response.status(common_1.HttpStatus.OK).json({ updatedGroupe });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async delete(response, id) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const deletedGroupe = await this.groupeService.delete(id);
            return response.status(common_1.HttpStatus.OK).json({ deletedGroupe });
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
    __metadata("design:paramtypes", [Object, groupe_schema_1.Groupe]),
    __metadata("design:returntype", Promise)
], GroupeController.prototype, "createGroupe", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupeController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupeController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, groupe_schema_1.Groupe]),
    __metadata("design:returntype", Promise)
], GroupeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GroupeController.prototype, "delete", null);
GroupeController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [groupe_service_1.GroupeService])
], GroupeController);
exports.GroupeController = GroupeController;
//# sourceMappingURL=groupe.controller.js.map