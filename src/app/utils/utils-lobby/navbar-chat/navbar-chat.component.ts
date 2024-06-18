import { Component, Input } from '@angular/core';
import { User } from 'src/@models/user.model';

@Component({
  selector: 'app-navbar-chat',
  templateUrl: './navbar-chat.component.html',
  styleUrls: ['./navbar-chat.component.scss']
})
export class NavbarChatComponent {
  @Input() user!: User;

  constructor() { }

  isAdmin(): boolean { return this.user.id != -1 ? true : false }
}
