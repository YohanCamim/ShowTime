import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;

    @Prop()
    date: string;

    @Prop()
    hour: string;

    @Prop()
    price: number;

    @Prop()
    location: string;

    @Prop()
    city: string;

    @Prop()
    capacity: number;

    @Prop()
    groups: number[];

    @Prop()
    genres: number[];

		@Prop()
		created_at: Date;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);