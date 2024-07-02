import { Component, Input, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/auth/login.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { ChatService } from 'src/app/services/websocket/chat.service';

import { Message } from 'src/@models/message.model';
import { User } from 'src/@models/user.model';


@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit {
  @Input() chat?: Message[];
  @Input() UserId?: number;
  reply: string = "";
  user!: User;


  constructor(
    private loginService: LoginService,
    private databaseService: DatabaseService,
    private chatService: ChatService
  ) {
    this.chatService.callBack.subscribe((res: Message) => {
      if (this.user.is_admin) {
        if (res.user_id == this.UserId) {
          this.chat?.push(res);
        }
      } else {
        if (this.user.id == res.user_id) {
          this.chat?.push(res);
        }
      }
    })
   }

   ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (data: User) => this.user = data
      });
    }
  }


  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  sendMsg(){
    let fecha = new Date()
    let month = fecha.getMonth()+1 < 10 ? `0${fecha.getMonth()+1}` : fecha.getMonth()+1;

    let msg: Message = {
      type: false,
      message: this.reply,
      user_id: this.user.id,
      published_in: `${fecha.getFullYear()}-${month}-${fecha.getDate()}`
    };

    if (this.user.is_admin) {
      msg.type = true
      msg.user_id = this.UserId ?? -1
    }

    if (msg.user_id != -1) {
      this.databaseService.addMessage(msg).subscribe({
        next: () => {
          console.log("Mensaje enviado exitosamente!");
        }
      });

      if (this.reply.trim() != "") {
        this.chatService.emitEvent(msg);
        this.chat?.push(msg);
      }
    }

    this.reply = "";
  }

}
