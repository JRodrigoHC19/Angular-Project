import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/@models/message.model';
import { User } from 'src/@models/user.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  @Output() selectedUserId = new EventEmitter<number>();
  users: number[] = [];

  constructor(
    private loginService: LoginService,
    private databaseService: DatabaseService
  ) { }

  isLoggedIn(): boolean { return this.loginService.isLoggedIn() }


  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loginService.UserRequest().subscribe({
        next: (data: User) => {
          if (data.is_admin) {
            this.databaseService.getChat_All().subscribe({
              next: (data: Message[]) => {
                const filterMsgByType: Message[] = data.filter(msg => !msg.type);
                const filterMsgByUserId = filterMsgByType.map(msg => msg.user_id);
                this.users = Array.from(new Set(filterMsgByUserId));
              }
            })

          }
        }
      })
    }
  }

  selectUser(id: number) {
    this.selectedUserId.emit(id);
  }
}
