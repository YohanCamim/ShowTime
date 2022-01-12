import { Model, Types } from "mongoose";
import { Concert, ConcertDocument } from '../schemas/concert.schema';
export declare class ConcertService {
    private concertModel;
    constructor(concertModel: Model<ConcertDocument>);
    create(concert: Concert): Promise<Concert>;
    readAll(): Promise<Concert[]>;
    readById(id: any): Promise<Concert>;
    update(id: any, concert: Concert): Promise<Concert>;
    delete(id: any): Promise<any>;
    updateGroup(id: Types.ObjectId, value: String): Promise<Concert>;
    deleteGroup(id: Types.ObjectId, value: String): Promise<Concert>;
    updateGenre(id: Types.ObjectId, value: String): Promise<Concert>;
    deleteGenre(id: Types.ObjectId, value: String): Promise<Concert>;
}
