/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateYandexDto } from './dto/update-yandex.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.id = uuidv4();
    const user1 = new this.userModel(createUserDto);
    return user1.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ id: id });
  }

  update(id: string, token: any) {
    return this.userModel.findOneAndUpdate({ id: id }, token);
  }

  Y_update(id: string, update_y_DTO: UpdateYandexDto) {
    return this.userModel.findOneAndUpdate({ id: id }, update_y_DTO);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async findOneByToken(y_accessToken: string) {
    return await this.userModel.findOne({ y_accessToken: y_accessToken });
  }

  async findOneByYandexId(y_Id: string) {
    return await this.userModel.findOne({ y_Id: y_Id });
  }

  async findOneBySessionId(sessionId: string) {
    return await this.userModel.findOne({ sessionId: sessionId });
  }
}
