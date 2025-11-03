/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coffee } from './entities/coffee.entity';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  create(createCoffeeDto: CreateCoffeeDto) {
    const id: string = uuidv4();
    createCoffeeDto.id = id;

    const createCoffeeDto1 = new this.coffeeModel(createCoffeeDto);

    return createCoffeeDto1.save();
  }

  findAll() {
    return this.coffeeModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} coffee`;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: string) {
    return this.coffeeModel.deleteOne({ id: id });
  }
}
