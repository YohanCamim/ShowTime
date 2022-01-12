/// <reference types="mongoose" />
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/services/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    register(RegisterDTO: RegisterDTO): Promise<{
        user: import("mongoose").LeanDocument<import("../types/user").User>;
        token: string;
    }>;
    login(loginDTO: LoginDTO): Promise<{
        user: import("mongoose").LeanDocument<import("../types/user").User>;
        token: string;
    }>;
}
