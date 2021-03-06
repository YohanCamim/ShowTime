"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        let str = '<!DOCTYPE html>'
            + '<html lang="en">'
            + '<head>'
            + '<title>API Routes</title>'
            + '<style>'
            + '.router{ color: blue; margin-left: 20px;}'
            + '.check{ color: grey; margin-left: 40px;}'
            + '.bodyDiv{ color: grey; margin-left: 40px;}'
            + '.returnDiv{ color: grey; margin-left: 40px;}'
            + '</style>'
            + '</head>'
            + '<body>'
            + '<h2>API Routes (http://127.0.0.1:3000/) :</h2>'
            + '<h3>AUTH</h3>'
            + '<div class="router">/auth/register</div>'
            + '<div class="check">check: ( not token )</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"firstName":"yohan",'
            + '"lastName":"yohan",'
            + '"email":"yohan@epitech.eu",'
            + '"password":"yohan"'
            + '}</div>'
            + '<div class="returnDiv">return: user( object ), token( string )</div>'
            + '<div class="router">/auth/login</div>'
            + '<div class="check">check: ( not token )</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"email":"yohan@epitech.eu",'
            + '"password":"yohan"'
            + '}</div>'
            + '<div class="returnDiv">return: user( object ), token( string )</div>'
            + '<h3>POST</h3>'
            + '<div class="router">/groups</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"name": string,'
            + '"description": string'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<div class="router">/genres</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"name": string,'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<div class="router">/concerts</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"name": string,'
            + '"description": string,'
            + '"date": string,'
            + '"hour": string,'
            + '"price": number,'
            + '"location": string,'
            + '"city": string,'
            + '"capacity": number,'
            + '"groups": number[],'
            + '"genres": number[]'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<h3>GET</h3>'
            + '<div class="router">/users</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="returnDiv">return: users[ objects ]</div>'
            + '<div class="router">/users/id_user</div>'
            + '<div class="check">check: ( isAdmin ) or ( id_user==user_connected )</div>'
            + '<div class="returnDiv">return: user( object )</div>'
            + '<div class="router">/users/favorites</div>'
            + '<div class="router">/users/reservations</div>'
            + '<div class="router">/users/wishlist</div>'
            + '<div class="check">check: ( not token )</div>'
            + '<div class="returnDiv">return: [ objects ]</div>'
            + '<div class="router">/concerts</div>'
            + '<div class="check">check: ( not token )</div>'
            + '<div class="returnDiv">return: concerts[ objects ]</div>'
            + '<div class="router">/concerts/id_concert</div>'
            + '<div class="check">check: ( not token )</div>'
            + '<div class="returnDiv">return: concerts( object ) and group( object )</div>'
            + '<div class="router">/groups</div>'
            + '<div class="router">/groups/id_group</div>'
            + '<div class="router">/genres</div>'
            + '<div class="router">/genres/id_genre</div>'
            + '<div class="router">/concerts/groups/id_concert</div>'
            + '<div class="router">/concerts/genres/id_concert</div>'
            + '<div class="check">check: ( not token )</div>'
            + '<div class="returnDiv">return: [ objects ]</div>'
            + '<h3>PUT</h3>'
            + '<div class="router">/users/id_user</div>'
            + '<div class="check">check: ( isAdmin ) or ( id_user==user_connected )</div>'
            + '<div class="returnDiv">return: user( object )</div>'
            + '<div class="router">/users/favorites/id_user</div>'
            + '<div class="check">check: ( isAdmin ) or ( id_user==user_connected )</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"id": number, (\'id\' is group_id in db)'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<div class="router">/users/reservations/id_user</div>'
            + '<div class="router">/users/wishlist/id_user</div>'
            + '<div class="check">check: ( isAdmin ) or ( id_user==user_connected )</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"id": number, (\'id\' is concert_id in db)'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<div class="router">/groups/id_group</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"name": string,'
            + '"description": string'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<div class="router">/concerts/id_concert</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"name": string,'
            + '"description": string'
            + '"date": string,'
            + '"hour": string,'
            + '"price": number,'
            + '"location": string,'
            + '"city": string,'
            + '"capacity": number,'
            + '"groups": number[],'
            + '"genres": number[]'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<div class="router">/concerts/groups/id_concert</div>'
            + '<div class="router">/concerts/genres/id_concert</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"id": number, (\'id\' is group_id or genre_id in db)'
            + '}</div>'
            + '<div class="returnDiv">return: object</div>'
            + '<h3>DELETE</h3>'
            + '<div class="router">/users/id_user</div>'
            + '<div class="check">check: ( isAdmin )</div>'
            + '<div class="returnDiv">return: none</div>'
            + '<div class="router">/users/favorites/id_user</div>'
            + '<div class="check">check: ( isAdmin ) or ( id_user==user_connected )</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"id": number, (\'id\' is group_id in db)'
            + '}</div>'
            + '<div class="returnDiv">return: none</div>'
            + '<div class="router">/users/reservations/id_user</div>'
            + '<div class="router">/users/wishlist/id_user</div>'
            + '<div class="check">check: ( isAdmin ) or ( id_user==user_connected )</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"id": number, (\'id\' is concert_id in db)'
            + '}</div>'
            + '<div class="returnDiv">return: none</div>'
            + '<div class="router">/groups/id_group</div>'
            + '<div class="router">/concerts/id_concert</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="returnDiv">return: none</div>'
            + '<div class="router">/concerts/groups/id_concert</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"id": number, (\'id\' is group_id in db)'
            + '}</div>'
            + '<div class="returnDiv">return: none</div>'
            + '<div class="router">/concerts/genres/id_concert</div>'
            + '<div class="check">check: isAdmin</div>'
            + '<div class="bodyDiv">body:'
            + '{'
            + '"id": number, (\'id\' is genre_id in db)'
            + '}</div>'
            + '<div class="returnDiv">return: none</div>'
            + '</body>'
            + '</html>';
        return str;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map