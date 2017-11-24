import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAndContentComponent } from './additional-data-message.component';

describe('ProductDetailComponent', () => {
  let component: MessageAndContentComponent;
  let fixture: ComponentFixture<MessageAndContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAndContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAndContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
