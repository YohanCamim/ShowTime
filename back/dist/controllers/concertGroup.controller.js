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
exports.ConcertGroupController = void 0;
const common_1 = require("@nestjs/common");
const concert_service_1 = require("../services/concert.service");
const groupe_service_1 = require("../services/groupe.service");
const passport_1 = require("@nestjs/passport");
let ConcertGroupController = class ConcertGroupController {
    constructor(concertService, groupeService) {
        this.concertService = concertService;
        this.groupeService = groupeService;
    }
    async findById(response, id) {
        const concert = await this.concertService.readById(id);
        const groups2 = await Promise.all(concert.groups.map(group_id => {
            return this.groupeService.readById(group_id);
        }));
        return await response.status(common_1.HttpStatus.OK).json({ groups2 });
    }
    async updateGroup(response, id, value) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const updateGroup = await (await this.concertService.updateGroup(id, value)).groups;
            return response.status(common_1.HttpStatus.OK).json({ updateGroup });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async deleteGroup(response, id, value) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const deleteGroup = await (await this.concertService.deleteGroup(id, value)).groups;
            return response.status(common_1.HttpStatus.OK).json({ deleteGroup });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConcertGroupController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ConcertGroupController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ConcertGroupController.prototype, "deleteGroup", null);
ConcertGroupController = __decorate([
    (0, common_1.Controller)('concerts/groups'),
    __metadata("design:paramtypes", [concert_service_1.ConcertService,
        groupe_service_1.GroupeService])
], ConcertGroupController);
exports.ConcertGroupController = ConcertGroupController;
//# sourceMappingURL=concertGroup.controller.js.map