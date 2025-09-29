import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { BookComment, Comment } from './entities/comment.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsGateway } from './comments.gateways';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: BookComment,
      },
    ]),
  ],

  controllers: [CommentsController],
  providers: [CommentsService, CommentsGateway],
})
export class CommentsModule {}
