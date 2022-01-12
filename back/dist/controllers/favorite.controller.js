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
exports.FavoriteController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const groupe_service_1 = require("../services/groupe.service");
const passport_1 = require("@nestjs/passport");
let FavoriteController = class FavoriteController {
    constructor(userService, groupeService) {
        this.userService = userService;
        this.groupeService = groupeService;
    }
    async findById(response, id) {
        const user = await this.userService.readById(id);
        const favorites = await Promise.all(user.favorites.map(favorite_id => {
            return this.groupeService.readById(favorite_id);
        }));
        return response.status(common_1.HttpStatus.OK).json({ favorites });
    }
    async updateFavorite(response, id, value) {
        const stringID = JSON.stringify(response.req.user._id);
        const stringIDdmde = JSON.stringify(id);
        if ((stringID === stringIDdmde) || (response.req.user.admin === true)) {
            const updateFavorite = await (await this.userService.updateFavorite(id, value)).favorites;
            return response.status(common_1.HttpStatus.OK).json({ updateFavorite });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async deleteFavorite(response, id, value) {
        const stringID = JSON.stringify(response.req.user._id);
        const stringIDdmde = JSON.stringify(id);
        if ((stringID === stringIDdmde) || (response.req.user.admin === true)) {
            const deleteFavorite = await (await this.userService.deleteFavorite(id, value)).favorites;
            return response.status(common_1.HttpStatus.OK).json({ deleteFavorite });
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
], FavoriteController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "updateFavorite", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], FavoriteController.prototype, "deleteFavorite", null);
FavoriteController = __decorate([
    (0, common_1.Controller)('users/favorites'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        groupe_service_1.GroupeService])
], FavoriteController);
exports.FavoriteController = FavoriteController;
//# sourceMappingURL=favorite.controller.js.map