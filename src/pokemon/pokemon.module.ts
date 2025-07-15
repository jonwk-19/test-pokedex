import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule, // Pera traer el config module de las env

    MongooseModule.forFeature([
      {
        name: Pokemon.name, //este es el nombre del documento no del pokemon que pusimos
        schema: PokemonSchema, //Schema que exportamos en el entity
      }
    ])//asyncrono si no quremos que se levante hasta que reuelva
  ],
  exports: [
    MongooseModule
  ]
})
export class PokemonModule {}
