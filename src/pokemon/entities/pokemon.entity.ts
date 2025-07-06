import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document { // Asiganar el extend Documente para que sea considerado un documento

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

// Le dice a mongo cuando se inicia la db las definiciones, reglas columnas, y asi
export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
