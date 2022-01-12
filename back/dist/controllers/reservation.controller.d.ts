import { UserService } from "src/services/user.service";
import { ConcertService } from "src/services/concert.service";
export declare class ReservationController {
    private readonly userService;
    private readonly concertService;
    constructor(userService: UserService, concertService: ConcertService);
    findById(response: any, id: any): Promise<any>;
    updateReservation(response: any, id: any, value: string): Promise<any>;
    deleteReservation(response: any, id: any, value: string): Promise<any>;
}
