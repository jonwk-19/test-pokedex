import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {



  constructor(
    @InjectModel( Pokemon.name ) //permite inyectar el modelo en el servicio
    private readonly pokemonModel : Model<Pokemon>,//importar el modelo de mongoose y pasar el entity

    private readonly http: AxiosAdapter,
  ){}

  async runSeed(){
    await this.pokemonModel.deleteMany({}); // esto se veria como un delete * from pokemons;

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    //NOSONAR
    const pokemonToInsert: {name: string, no: number}[] = [];
    data.results.forEach(({name, url}) =>{
      const segments = url.split('/');
      const no = +segments[ segments.length - 2];

      // await this.pokemonModel.create({name, no})
      pokemonToInsert.push({name, no});
    });

    await this.pokemonModel.insertMany(pokemonToInsert)

    return 'Seed executed';
  }


  // async runSeed(){
  //   await this.pokemonModel.deleteMany({}); // esto se veria como un delete * from pokemons;

  //   const { data } = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=8')

  //   const insertPromisesArray: Promise<Pokemon>[] = [];
  //   data.results.forEach(({name, url}) =>{
  //     const segments = url.split('/');
  //     const no = +segments[ segments.length - 2];

  //     // await this.pokemonModel.create({name, no})
  //     insertPromisesArray.push(
  //       this.pokemonModel.create({name, no})
  //     );
  //   });

  //   await Promise.all( insertPromisesArray );

  //   return 'Seed executed';
  // }
}
