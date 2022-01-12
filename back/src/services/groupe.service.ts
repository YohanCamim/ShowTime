import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Groupe, GroupeDocument } from '../schemas/groupe.schema';

@Injectable()
export class GroupeService {

    constructor(@InjectModel(Groupe.name) private groupeModel: Model<GroupeDocument>) {}
    
    async create(groupe: Groupe): Promise<Groupe> {
        const newGroupe = new this.groupeModel(groupe);
        return newGroupe.save();
    }

    async readAll(): Promise<Groupe[]> {
        return await this.groupeModel.find().exec();
    }

    async readById(id): Promise<Groupe> {
        return await this.groupeModel.findById(id).exec();
    }

    async update(id, groupe: Groupe): Promise<Groupe> {
        return await this.groupeModel.findByIdAndUpdate(id, groupe, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.groupeModel.findByIdAndRemove(id);
    }
}