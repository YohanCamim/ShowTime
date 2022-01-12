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
exports.GroupeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const groupe_schema_1 = require("../schemas/groupe.schema");
let GroupeService = class GroupeService {
    constructor(groupeModel) {
        this.groupeModel = groupeModel;
    }
    async create(groupe) {
        const newGroupe = new this.groupeModel(groupe);
        return newGroupe.save();
    }
    async readAll() {
        return await this.groupeModel.find().exec();
    }
    async readById(id) {
        return await this.groupeModel.findById(id).exec();
    }
    async update(id, groupe) {
        return await this.groupeModel.findByIdAndUpdate(id, groupe, { new: true });
    }
    async delete(id) {
        return await this.groupeModel.findByIdAndRemove(id);
    }
};
GroupeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(groupe_schema_1.Groupe.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GroupeService);
exports.GroupeService = GroupeService;
//# sourceMappingURL=groupe.service.js.map