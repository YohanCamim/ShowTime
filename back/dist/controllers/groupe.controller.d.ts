import { Groupe } from "../schemas/groupe.schema";
import { GroupeService } from "src/services/groupe.service";
export declare class GroupeController {
    private readonly groupeService;
    constructor(groupeService: GroupeService);
    createGroupe(response: any, groupe: Groupe): Promise<any>;
    fetchAll(response: any): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    update(response: any, id: any, groupe: Groupe): Promise<any>;
    delete(response: any, id: any): Promise<any>;
}
