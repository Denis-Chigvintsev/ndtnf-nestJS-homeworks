/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly comment: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    createCommentDto.id = uuidv4();
    const comment1 = new this.comment(createCommentDto);
    return await comment1.save();
  }

  async findAll() {
    return await this.comment.find();
  }

  async findOne(id: string) {
    const comment = await this.comment.findOne({ id: id });

    if (!comment) {
      throw new NotFoundException(`нет комментария с  id ${id}`);
    }
    return comment;
  }

  async findAllByBookId(bookId: string) {
    const output = await this.comment.find({ bookId: bookId });
    return output;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const existingComment = await this.comment.findOneAndUpdate(
      { id: id },
      { $set: updateCommentDto },
      { new: true },
    );

    if (!existingComment) {
      throw new NotFoundException(`comment not found`);
    }

    return existingComment;
  }

  async remove(id: string) {
    const comment1 = await this.comment.findOneAndDelete({ id: id });
    if (!comment1) {
      throw new NotFoundException(
        `нет комментария с ${id} или комментарий удален`,
      );
    } else return comment1;
  }
}
