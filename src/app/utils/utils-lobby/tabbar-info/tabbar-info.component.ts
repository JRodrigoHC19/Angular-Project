import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabbar-info',
  templateUrl: './tabbar-info.component.html',
  styleUrls: ['./tabbar-info.component.scss']
})
export class TabbarInfoComponent {
  @Input() hiddenChilden: boolean[] = [true, true, true];
  @Output() selectedUserId = new EventEmitter<number>();

  hiddenConfigInside: boolean = false;
  hiddenAboutMe: boolean = true;
  hiddenTC: boolean = true;

  enable_AboutMe(){
    this.hiddenConfigInside = true
    this.hiddenAboutMe = false
  }

  enable_TC(){
    this.hiddenConfigInside = true
    this.hiddenTC = false
  }

  backPage(){
    this.hiddenConfigInside = false
    this.hiddenAboutMe = true
    this.hiddenTC = true
   }

   getUserId(id: number) {
    this.selectedUserId.emit(id);
   }
}
