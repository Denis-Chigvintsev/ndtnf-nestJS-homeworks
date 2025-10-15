/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CharactersService {
  ///
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
  ) {}

  /// ниже CRUD методы

  async create(createCharacterDto: CreateCharacterDto) {
    const iid: string = uuidv4();

    if (iid) {
      console.log(iid);
      createCharacterDto.id = iid;

      const createCharacterDto1 = new this.characterModel(createCharacterDto);

      console.log('create');

      return await createCharacterDto1.save();
    }
  }

  async findAll() {
    console.log('findall');
    return await this.characterModel.find();
  }

  async findOne(id: string) {
    console.log('findOne', id);
    const character = await this.characterModel.findOne({ id: id });

    if (!character) {
      throw new NotFoundException(`нет персонажа с id ${id}`);
    }

    return character;
  }

  /////
  update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  async remove(id: string) {
    console.log('remove', id);
    const character = await this.characterModel.deleteOne({ id: id });

    if (!character) {
      throw new NotFoundException(`нет персонажа с id ${id}`);
    }

    return character;
  }
}
