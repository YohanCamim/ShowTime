import { ConcertService } from "src/services/concert.service";
export declare class ConcertGenreController {
    private readonly concertService;
    constructor(concertService: ConcertService);
    findById(response: any, id: any): Promise<any>;
    updateGroup(response: any, id: any, value: string): Promise<any>;
    deleteGroup(response: any, id: any, value: string): Promise<any>;
}
