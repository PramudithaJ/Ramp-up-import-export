import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({cors: {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  credentials: true,
},})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{
  

  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: any) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }

  sendMessage(event: string, message: any): void {
    this.server.emit(event, message);
  }


}
