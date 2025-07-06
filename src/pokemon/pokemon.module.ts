import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //este es el nombre del documento no del pokemon que pusimos
        schema: PokemonSchema, //Schema que exportamos en el entity
      }
    ])//asyncrono si no quremos que se levante hasta que reuelva
  ]
})
export class PokemonModule {}
