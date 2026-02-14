import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(3001, { cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: any) {
        console.log('Client disconnected:', client.id);
    }

    emitNewIncident(data: any) {
        this.server.emit('new_incident', data);
    }
}
