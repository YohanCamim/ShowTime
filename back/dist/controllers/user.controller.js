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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const groupe_service_1 = require("../services/groupe.service");
const concert_service_1 = require("../services/concert.service");
const user_dto_1 = require("../schemas/user.dto");
const passport_1 = require("@nestjs/passport");
let UserController = class UserController {
    constructor(userService, groupeService, concertService) {
        this.userService = userService;
        this.groupeService = groupeService;
        this.concertService = concertService;
    }
    async fetchAll(response) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const users = await this.userService.readAll();
            return response.status(common_1.HttpStatus.OK).json({ users });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async findById(response, id) {
        const stringID = JSON.stringify(response.req.user._id);
        const stringIDdmde = JSON.stringify(id);
        if ((stringID === stringIDdmde) || (response.req.user.admin === true)) {
            const user = await this.userService.readById(id);
            return response.status(common_1.HttpStatus.OK).json({ user });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async update(response, id, UserDTO) {
        const stringID = JSON.stringify(response.req.user._id);
        const stringIDdmde = JSON.stringify(id);
        if ((stringID === stringIDdmde) || (response.req.user.admin === true)) {
            const updatedUser = await this.userService.update(id, UserDTO);
            return response.status(common_1.HttpStatus.OK).json({ updatedUser });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async delete(response, id) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const deletedUser = await this.userService.delete(id);
            return response.status(common_1.HttpStatus.OK).json({ deletedUser });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        groupe_service_1.GroupeService,
        concert_service_1.ConcertService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map