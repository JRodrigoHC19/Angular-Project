import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarChatComponent } from './navbar-chat.component';

describe('NavbarChatComponent', () => {
  let component: NavbarChatComponent;
  let fixture: ComponentFixture<NavbarChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarChatComponent]
    });
    fixture = TestBed.createComponent(NavbarChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
