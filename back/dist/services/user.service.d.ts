import { Model, Types } from "mongoose";
import { User } from 'src/types/user';
import { RegisterDTO } from 'src/user/register.dto';
import { LoginDTO } from 'src/auth/login.dto';
import { Payload } from 'src/types/payload';
import { UserDTO } from "src/schemas/user.dto";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(RegisterDTO: RegisterDTO): Promise<import("mongoose").LeanDocument<User>>;
    findByPayload(payload: Payload): Promise<User & {
        _id: any;
    }>;
    findByLogin(UserDTO: LoginDTO): Promise<import("mongoose").LeanDocument<User>>;
    sanitizeUser(user: User): import("mongoose").LeanDocument<User>;
    readAll(): Promise<User[]>;
    readById(id: Types.ObjectId): Promise<User>;
    update(id: any, UserDTO: UserDTO): Promise<User>;
    updateFavorite(id: Types.ObjectId, value: String): Promise<User>;
    deleteFavorite(id: Types.ObjectId, value: String): Promise<User>;
    updateReservation(id: Types.ObjectId, value: String): Promise<User>;
    deleteReservation(id: Types.ObjectId, value: String): Promise<User>;
    updateWishlist(id: Types.ObjectId, value: String): Promise<User>;
    deleteWishlist(id: Types.ObjectId, value: String): Promise<User>;
    delete(id: Types.ObjectId): Promise<any>;
}
