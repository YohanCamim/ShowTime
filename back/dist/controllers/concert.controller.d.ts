import { Concert, ConcertDocument } from "src/schemas/concert.schema";
import { Model } from "mongoose";
import { ConcertService } from "../services/concert.service";
import { GroupeService } from "../services/groupe.service";
export declare class ConcertController {
    private concertModel;
    private readonly concertService;
    private readonly groupeService;
    constructor(concertModel: Model<ConcertDocument>, concertService: ConcertService, groupeService: GroupeService);
    createConcert(response: any, concert: Concert): Promise<any>;
    fetchAll(response: any): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    update(response: any, id: any, concert: Concert): Promise<any>;
    delete(response: any, id: any): Promise<any>;
}
