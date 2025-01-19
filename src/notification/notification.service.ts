import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {

    private readonly connectedClients: Map<string, Socket> = new Map();
    private server: Server;

    constructor(private readonly Gateway: NotificationGateway){}

    handleConnection(socket: Socket){
        const clientId = socket.id
        this.connectedClients.set(clientId, socket)

        socket.on('disconnect', ()=>{
           this.connectedClients.delete(clientId)
        });
    }

    sendMessage(event: string, message: any): void {
        this.Gateway.sendMessage(event, message);
      }

}
