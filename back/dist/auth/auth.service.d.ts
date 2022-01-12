import { Payload } from 'src/types/payload';
import { UserService } from 'src/services/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    signPayload(payload: Payload): Promise<string>;
    validateUser(payload: Payload): Promise<import("../types/user").User & {
        _id: any;
    }>;
}
