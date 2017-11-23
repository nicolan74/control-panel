import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyAndLaunchurlMessageComponent } from './only-and-launchurl-message.component';

describe('NotificationMessageComponent', () => {
  let component: OnlyAndLaunchurlMessageComponent;
  let fixture: ComponentFixture<OnlyAndLaunchurlMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlyAndLaunchurlMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlyAndLaunchurlMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
