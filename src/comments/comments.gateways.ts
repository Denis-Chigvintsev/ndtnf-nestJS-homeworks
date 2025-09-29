/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
let clientID: string | null;

@WebSocketGateway({ cors: { origin: '*' } })
export class CommentsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly commentsService: CommentsService) {}

  @WebSocketServer() server: any;

  handleConnection(client: Socket) {
    console.log('Клиент успешно подключился к сокету', client.id);
    clientID = client.id;
  }

  handleDisconnect(client: Socket) {
    console.log('Клиент отключился', client.id);
  }

  @SubscribeMessage('create')
  async handleMessage(
    @MessageBody() dto: CreateCommentDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.commentsService.create(dto);

    await this.server.to(client.id).emit('message', message);
  }

  @SubscribeMessage('getAllCommentsByBookId')
  async handleMessage1(
    @MessageBody() bookId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.commentsService.findAllByBookId(bookId);

    await this.server.to(client.id).emit('message', message);
  }
}
