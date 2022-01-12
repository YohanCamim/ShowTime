import { Document } from "mongoose";
export declare type GenreDocument = Genre & Document;
export declare class Genre {
    name: string;
}
export declare const GenreSchema: import("mongoose").Schema<Document<Genre, any, any>, import("mongoose").Model<Document<Genre, any, any>, any, any, any>, any>;
