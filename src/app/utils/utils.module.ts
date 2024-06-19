import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HeaderComponent } from './utils-home/header/header.component';
import { FooterComponent } from './utils-home/footer/footer.component';

import { ProductListComponent } from "./utils-products/product-list/product-list.component";
import { ProductItemComponent } from "./utils-products/product-item/product-item.component";

import { QrCodeComponent } from './utils-lobby/qr-code/qr-code.component';
import { NavbarChatComponent } from "./utils-lobby/navbar-chat/navbar-chat.component";
import { PrivateChatComponent } from "./utils-lobby/private-chat/private-chat.component";
import { TabbarComponent } from './utils-lobby/tabbar/tabbar.component';
import { TabbarInfoComponent } from './utils-lobby/tabbar-info/tabbar-info.component';
import { ChatListComponent } from './utils-admin/chat-list/chat-list.component';



@NgModule({
  declarations: [
    QrCodeComponent,

    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductItemComponent,

    PrivateChatComponent,
    NavbarChatComponent,
    TabbarComponent,
    TabbarInfoComponent,

    ChatListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,

    ProductListComponent,
    ProductItemComponent,

    QrCodeComponent,
    PrivateChatComponent,
    NavbarChatComponent,
    TabbarComponent,
    TabbarInfoComponent,

    ChatListComponent
  ]
})
export class UtilsModule { }
