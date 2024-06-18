import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbarInfoComponent } from './tabbar-info.component';

describe('TabbarInfoComponent', () => {
  let component: TabbarInfoComponent;
  let fixture: ComponentFixture<TabbarInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabbarInfoComponent]
    });
    fixture = TestBed.createComponent(TabbarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
