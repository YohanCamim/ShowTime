import { Genre } from "../schemas/genre.schema";
import { GenreService } from "src/services/genre.service";
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    createGroupe(response: any, genre: Genre): Promise<any>;
    fetchAll(response: any): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    update(response: any, id: any, genre: Genre): Promise<any>;
    delete(response: any, id: any): Promise<any>;
}
