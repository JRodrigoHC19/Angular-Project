import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from 'src/@models/message.model';

const URL_BASE: string = 'ws://localhost:8040';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends Socket {
  callBack: EventEmitter<Message> = new EventEmitter();

  constructor() {
    super({url: URL_BASE, options: {
      query: { nameRoom: "channelGroup" }
    }});
    this.listenEvent()
  }

  listenEvent() {
    this.ioSocket.on('event', (res: Message) => this.callBack.emit(res));
  }
  emitEvent(payload: Message) {
    this.ioSocket.emit('event', payload);
  }
}
