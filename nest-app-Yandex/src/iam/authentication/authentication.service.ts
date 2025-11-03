/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { SighUpDto } from './dto/sigh-up.dto/sigh-up.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { SighInDto } from './dto/sigh-in.dto/sigh-in.dto';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SighUpDto) {
    const foundInDatabase: any = await this.usersService.findOneByEmail(
      signUpDto.email,
    );
    if (foundInDatabase) {
      return ' пользователь с таким email уже есть, попробуй альтернативный';
    } else
      return await this.usersService.create({
        email: signUpDto.email,
        password: await this.hashingService.hash(signUpDto.password),
        token: '',
      });
  }

  async signIn(signInDto: SighInDto) {
    const foundInDatabase: any = await this.usersService.findOneByEmail(
      signInDto.email,
    );

    if (!foundInDatabase) {
      return { message: 'такого пользователя не существует' };
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      foundInDatabase.password,
    );
    if (!isEqual) {
      return { message: 'пароль неверен' };
    }

    const token = { id: foundInDatabase.id, secret: randomUUID() };

    const updatedUser = await this.usersService.update(foundInDatabase.id, {
      token: await this.hashingService.hash(token.secret),
    });
    console.log(updatedUser);
    return token;
  }
}
