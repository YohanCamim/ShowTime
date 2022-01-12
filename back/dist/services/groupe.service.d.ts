import { Model } from "mongoose";
import { Groupe, GroupeDocument } from '../schemas/groupe.schema';
export declare class GroupeService {
    private groupeModel;
    constructor(groupeModel: Model<GroupeDocument>);
    create(groupe: Groupe): Promise<Groupe>;
    readAll(): Promise<Groupe[]>;
    readById(id: any): Promise<Groupe>;
    update(id: any, groupe: Groupe): Promise<Groupe>;
    delete(id: any): Promise<any>;
}
