import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { LoginService } from 'src/app/services/auth/login.service';
import { DatabaseService } from 'src/app/services/database/database.service';

import { Message } from 'src/@models/message.model';
import { User } from 'src/@models/user.model';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  @Output() suiEvent = new EventEmitter<number>();
  users: number[] = [];


  constructor(
    private loginService: LoginService,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (data: User) => { if (data.is_admin) {
          this.databaseService.getChat_All().subscribe({
            next: (data: Message[]) => {
              const ftrByType = data.filter(msg => !msg.type);
              const ftrByUserId = ftrByType.map(msg => msg.user_id);
              this.users = Array.from(new Set(ftrByUserId));
            }
          })
        }}
      })
    }
  }


  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  selectUserId(id: number) { this.suiEvent.emit(id) }

}
