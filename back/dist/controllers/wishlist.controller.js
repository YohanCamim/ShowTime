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
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const concert_service_1 = require("../services/concert.service");
const passport_1 = require("@nestjs/passport");
let WishlistController = class WishlistController {
    constructor(userService, concertService) {
        this.userService = userService;
        this.concertService = concertService;
    }
    async findById(response, id) {
        const user = await (await this.userService.readById(id));
        const wishlist = await Promise.all(user.wishlist.map(wishlist_id => {
            return this.concertService.readById(wishlist_id);
        }));
        return response.status(common_1.HttpStatus.OK).json({ wishlist });
    }
    async updateWishlist(response, id, value) {
        const stringID = JSON.stringify(response.req.user._id);
        const stringIDdmde = JSON.stringify(id);
        if ((stringID === stringIDdmde) || (response.req.user.admin === true)) {
            const updateWishlist = await (await this.userService.updateWishlist(id, value)).wishlist;
            return response.status(common_1.HttpStatus.OK).json({ updateWishlist });
        }
        else {
            return response.status(common_1.HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({ "message": "Unauthorized" });
        }
    }
    async deleteWishlist(response, id, value) {
        const stringID = JSON.stringify(response.req.user._id);
        const stringIDdmde = JSON.stringify(id);
        if ((stringID === stringIDdmde) || (response.req.user.admin === true)) {
            const deleteWishlist = await (await this.userService.deleteWishlist(id, value)).wishlist;
            return response.status(common_1.HttpStatus.OK).json({ deleteWishlist });
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
], WishlistController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "updateWishlist", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "deleteWishlist", null);
WishlistController = __decorate([
    (0, common_1.Controller)('users/wishlist'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        concert_service_1.ConcertService])
], WishlistController);
exports.WishlistController = WishlistController;
//# sourceMappingURL=wishlist.controller.js.map