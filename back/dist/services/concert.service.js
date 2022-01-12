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
exports.ConcertService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const concert_schema_1 = require("../schemas/concert.schema");
let ConcertService = class ConcertService {
    constructor(concertModel) {
        this.concertModel = concertModel;
    }
    async create(concert) {
        const newConcert = new this.concertModel(Object.assign(Object.assign({}, concert), { created_at: new Date() }));
        return newConcert.save();
    }
    async readAll() {
        return await this.concertModel.find().exec();
    }
    async readById(id) {
        return await this.concertModel.findById(id).exec();
    }
    async update(id, concert) {
        return await this.concertModel.findByIdAndUpdate(id, concert, { new: true });
    }
    async delete(id) {
        return await this.concertModel.findByIdAndRemove(id);
    }
    async updateGroup(id, value) {
        await this.concertModel.updateOne({ _id: id }, { $push: { groups: value['id'] } });
        return await this.concertModel.findById(id).exec();
    }
    async deleteGroup(id, value) {
        await this.concertModel.updateOne({ _id: id }, { $pull: { groups: value['id'] } });
        return await this.concertModel.findById(id).exec();
    }
    async updateGenre(id, value) {
        await this.concertModel.updateOne({ _id: id }, { $push: { genres: value['id'] } });
        return await this.concertModel.findById(id).exec();
    }
    async deleteGenre(id, value) {
        await this.concertModel.updateOne({ _id: id }, { $pull: { genres: value['id'] } });
        return await this.concertModel.findById(id).exec();
    }
};
ConcertService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(concert_schema_1.Concert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ConcertService);
exports.ConcertService = ConcertService;
//# sourceMappingURL=concert.service.js.map