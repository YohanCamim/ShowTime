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
exports.ConcertController = void 0;
const common_1 = require("@nestjs/common");
const concert_schema_1 = require("../schemas/concert.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const concert_service_1 = require("../services/concert.service");
const groupe_service_1 = require("../services/groupe.service");
const passport_1 = require("@nestjs/passport");
let ConcertController = class ConcertController {
    constructor(concertModel, concertService, groupeService) {
        this.concertModel = concertModel;
        this.concertService = concertService;
        this.groupeService = groupeService;
    }
    async createConcert(response, concert) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const newConcert = await this.concertService.create(concert);
            return response.status(common_1.HttpStatus.CREATED).json({ newConcert });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async fetchAll(response) {
        const concerts = await this.concertService.readAll();
        return response.status(common_1.HttpStatus.OK).json({ concerts });
    }
    async findById(response, id) {
        const concert = await this.concertService.readById(id);
        concert.groups = await Promise.all(concert.groups.map(group_id => {
            return this.groupeService.readById(group_id);
        }));
        return response.status(common_1.HttpStatus.OK).json({ concert });
    }
    async update(response, id, concert) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const updatedConcert = await this.concertService.update(id, concert);
            return response.status(common_1.HttpStatus.OK).json({ updatedConcert });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async delete(response, id) {
        const respAdmin = response.req.user.admin;
        if (respAdmin === true) {
            const deletedConcert = await this.concertService.delete(id);
            return response.status(common_1.HttpStatus.OK).json({ deletedConcert });
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
    __metadata("design:paramtypes", [Object, concert_schema_1.Concert]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "createConcert", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, concert_schema_1.Concert]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConcertController.prototype, "delete", null);
ConcertController = __decorate([
    (0, common_1.Controller)('concerts'),
    __param(0, (0, mongoose_1.InjectModel)(concert_schema_1.Concert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        concert_service_1.ConcertService,
        groupe_service_1.GroupeService])
], ConcertController);
exports.ConcertController = ConcertController;
//# sourceMappingURL=concert.controller.js.map