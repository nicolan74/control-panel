import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDataMessageComponent } from './additional-data-message.component';

describe('ProductDetailComponent', () => {
  let component: AdditionalDataMessageComponent;
  let fixture: ComponentFixture<AdditionalDataMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalDataMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
