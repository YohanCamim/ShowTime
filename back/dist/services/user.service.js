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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(RegisterDTO) {
        const { email } = RegisterDTO;
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new common_1.HttpException('user already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(RegisterDTO);
        await createdUser.save();
        return this.sanitizeUser(createdUser);
    }
    async findByPayload(payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email });
    }
    async findByLogin(UserDTO) {
        const { email, password } = UserDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException('user doesnt exists', common_1.HttpStatus.BAD_REQUEST);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        }
        else {
            throw new common_1.HttpException('invalid credential', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    sanitizeUser(user) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
    }
    async readAll() {
        return await this.userModel.find().exec();
    }
    async readById(id) {
        return await this.userModel.findById(id).exec();
    }
    async update(id, UserDTO) {
        const update = await this.userModel.findByIdAndUpdate(id);
        return await this.userModel.findByIdAndUpdate(id, UserDTO, { new: true });
    }
    async updateFavorite(id, value) {
        await this.userModel.updateOne({ _id: id }, { $push: { favorites: value['id'] } });
        return await this.userModel.findById(id).exec();
    }
    async deleteFavorite(id, value) {
        await this.userModel.updateOne({ _id: id }, { $pull: { favorites: value['id'] } });
        return await this.userModel.findById(id).exec();
    }
    async updateReservation(id, value) {
        await this.userModel.updateOne({ _id: id }, { $push: { reservations: value['id'] } });
        return await this.userModel.findById(id).exec();
    }
    async deleteReservation(id, value) {
        await this.userModel.updateOne({ _id: id }, { $pull: { reservations: value['id'] } });
        return await this.userModel.findById(id).exec();
    }
    async updateWishlist(id, value) {
        await this.userModel.updateOne({ _id: id }, { $push: { wishlist: value['id'] } });
        return await this.userModel.findById(id).exec();
    }
    async deleteWishlist(id, value) {
        await this.userModel.updateOne({ _id: id }, { $pull: { wishlist: value['id'] } });
        return await this.userModel.findById(id).exec();
    }
    async delete(id) {
        return await this.userModel.findByIdAndRemove(id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map