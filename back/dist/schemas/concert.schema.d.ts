import { Document } from "mongoose";
export declare type ConcertDocument = Concert & Document;
export declare class Concert {
    name: string;
    description: string;
    date: string;
    hour: string;
    price: number;
    location: string;
    city: string;
    capacity: number;
    groups: number[];
    genres: number[];
    created_at: Date;
}
export declare const ConcertSchema: import("mongoose").Schema<Document<Concert, any, any>, import("mongoose").Model<Document<Concert, any, any>, any, any, any>, any>;
