import { Document } from "mongoose";
export declare type GroupeDocument = Groupe & Document;
export declare class Groupe {
    name: string;
    description: string;
}
export declare const GroupeSchema: import("mongoose").Schema<Document<Groupe, any, any>, import("mongoose").Model<Document<Groupe, any, any>, any, any, any>, any>;
