import { UserService } from "src/services/user.service";
import { GroupeService } from "../services/groupe.service";
export declare class FavoriteController {
    private readonly userService;
    private readonly groupeService;
    constructor(userService: UserService, groupeService: GroupeService);
    findById(response: any, id: any): Promise<any>;
    updateFavorite(response: any, id: any, value: string): Promise<any>;
    deleteFavorite(response: any, id: any, value: string): Promise<any>;
}
