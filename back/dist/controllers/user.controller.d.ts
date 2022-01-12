import { UserService } from "src/services/user.service";
import { GroupeService } from "../services/groupe.service";
import { ConcertService } from "../services/concert.service";
import { UserDTO } from "src/schemas/user.dto";
export declare class UserController {
    private readonly userService;
    private readonly groupeService;
    private readonly concertService;
    constructor(userService: UserService, groupeService: GroupeService, concertService: ConcertService);
    fetchAll(response: any): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    update(response: any, id: any, UserDTO: UserDTO): Promise<any>;
    delete(response: any, id: any): Promise<any>;
}
