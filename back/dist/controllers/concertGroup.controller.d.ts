import { ConcertService } from "src/services/concert.service";
import { GroupeService } from "src/services/groupe.service";
export declare class ConcertGroupController {
    private readonly concertService;
    private readonly groupeService;
    constructor(concertService: ConcertService, groupeService: GroupeService);
    findById(response: any, id: any): Promise<any>;
    updateGroup(response: any, id: any, value: string): Promise<any>;
    deleteGroup(response: any, id: any, value: string): Promise<any>;
}
