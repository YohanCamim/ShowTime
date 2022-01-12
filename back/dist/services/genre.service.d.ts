import { Model } from "mongoose";
import { Genre, GenreDocument } from '../schemas/genre.schema';
export declare class GenreService {
    private genreModel;
    constructor(genreModel: Model<GenreDocument>);
    create(genre: Genre): Promise<Genre>;
    readAll(): Promise<Genre[]>;
    readById(id: any): Promise<Genre>;
    update(id: any, genre: Genre): Promise<Genre>;
    delete(id: any): Promise<any>;
}
