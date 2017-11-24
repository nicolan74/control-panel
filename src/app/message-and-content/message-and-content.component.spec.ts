import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDataSelectionComponent } from './message-and-content.component';

describe('ProductsComponent', () => {
  let component: AdditionalDataSelectionComponent;
  let fixture: ComponentFixture<AdditionalDataSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalDataSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalDataSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
