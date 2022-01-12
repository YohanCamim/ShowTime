"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const user_controller_1 = require("../controllers/user.controller");
const concert_controller_1 = require("../controllers/concert.controller");
const groupe_controller_1 = require("../controllers/groupe.controller");
const concert_schema_1 = require("../schemas/concert.schema");
const groupe_schema_1 = require("../schemas/groupe.schema");
const concert_service_1 = require("../services/concert.service");
const groupe_service_1 = require("../services/groupe.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: concert_schema_1.Concert.name, schema: concert_schema_1.ConcertSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: groupe_schema_1.Groupe.name, schema: groupe_schema_1.GroupeSchema }])
        ],
        providers: [user_service_1.UserService, concert_service_1.ConcertService, groupe_service_1.GroupeService],
        controllers: [user_controller_1.UserController, concert_controller_1.ConcertController, groupe_controller_1.GroupeController],
        exports: [user_service_1.UserService, concert_service_1.ConcertService, groupe_service_1.GroupeService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map