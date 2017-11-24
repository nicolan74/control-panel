import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAndUrlComponent } from './message-and-url.component';

describe('NotificationMessageComponent', () => {
  let component: MessageAndUrlComponent;
  let fixture: ComponentFixture<MessageAndUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAndUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAndUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
