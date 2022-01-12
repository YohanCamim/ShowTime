"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const concert_controller_1 = require("./controllers/concert.controller");
const concertGroup_controller_1 = require("./controllers/concertGroup.controller");
const concertGenre_controller_1 = require("./controllers/concertGenre.controller");
const favorite_controller_1 = require("./controllers/favorite.controller");
const reservation_controller_1 = require("./controllers/reservation.controller");
const wishlist_controller_1 = require("./controllers/wishlist.controller");
const groupe_controller_1 = require("./controllers/groupe.controller");
const genre_controller_1 = require("./controllers/genre.controller");
const concert_schema_1 = require("./schemas/concert.schema");
const groupe_schema_1 = require("./schemas/groupe.schema");
const genre_schema_1 = require("./schemas/genre.schema");
const concert_service_1 = require("./services/concert.service");
const groupe_service_1 = require("./services/groupe.service");
const genre_service_1 = require("./services/genre.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:admin@dbshowtime.dsdpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
                useNewUrlParser: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: concert_schema_1.Concert.name, schema: concert_schema_1.ConcertSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: groupe_schema_1.Groupe.name, schema: groupe_schema_1.GroupeSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: genre_schema_1.Genre.name, schema: genre_schema_1.GenreSchema }]),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController, favorite_controller_1.FavoriteController, reservation_controller_1.ReservationController, wishlist_controller_1.WishlistController,
            concert_controller_1.ConcertController, concertGroup_controller_1.ConcertGroupController, concertGenre_controller_1.ConcertGenreController,
            groupe_controller_1.GroupeController, genre_controller_1.GenreController],
        providers: [app_service_1.AppService, concert_service_1.ConcertService, groupe_service_1.GroupeService, genre_service_1.GenreService],
        exports: [groupe_service_1.GroupeService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map