import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit : number;
  //Las inyecciones de dependencias solo se hacen en el constructor
  constructor(
    @InjectModel( Pokemon.name ) //permite inyectar el modelo en el servicio
    private readonly pokemonModel : Model<Pokemon>,//importar el modelo de mongoose y pasar el entity
    private readonly configService: ConfigService,
  ){
    //NOSONAR
    // console.log(process.env.DEFAULT_LIMIT);
    // console.log(configService.get('defaultlimint'))
    // console.log(configService.getOrThrow('jwt-seed')); // Si no lo encuentra lanza error y truena la app

    this.defaultLimit = configService.get<number>('defaultlimint')!;
  }

async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto )
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel.find()
    .limit( limit )
    .skip( offset )
    .sort({
      no: 1
    })
    .select('-__v')
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null = null;

    if ( !isNaN(+term)){
      pokemon  = await this.pokemonModel.findOne({no: term});
    }

    //MongoID
    if(!pokemon && isValidObjectId( term )){
      pokemon  = await this.pokemonModel.findById(term);
    }

    //Name
    if(!pokemon){ // NOSONAR
      pokemon  = await this.pokemonModel.findOne({name: term.toLowerCase().trim()});
    }

    //los throw tambien son returns
    if (!pokemon)
      throw new NotFoundException(`Pokemon with id, name or no "${term}"  not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //this will be retunr a not just a pokemon it will return a model
    const pokemon = await this.findOne(term);
    if ( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase()

    try {
      await pokemon.updateOne( updatePokemonDto)
      return {...pokemon.toJSON(), ...updatePokemonDto};

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    //NOSONAR
    // const pokemon = await this.findOne(id); /
    // await pokemon.deleteOne();
    // return {id};
    // const result = await this.pokemonModel.findByIdAndDelete(id)

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id})

    if ( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${id}" not found`)

    return; //NOSONAR
  }

  private handleExceptions( error: any){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ( error.code === 11000 ){
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(`Pokemon already exist in db ${ JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}
