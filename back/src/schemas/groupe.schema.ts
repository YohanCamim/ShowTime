import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type GroupeDocument = Groupe & Document;

@Schema()
export class Groupe {

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;
}

export const GroupeSchema = SchemaFactory.createForClass(Groupe);