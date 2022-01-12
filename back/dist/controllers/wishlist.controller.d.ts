import { UserService } from "src/services/user.service";
import { ConcertService } from "src/services/concert.service";
export declare class WishlistController {
    private readonly userService;
    private readonly concertService;
    constructor(userService: UserService, concertService: ConcertService);
    findById(response: any, id: any): Promise<any>;
    updateWishlist(response: any, id: any, value: string): Promise<any>;
    deleteWishlist(response: any, id: any, value: string): Promise<any>;
}
