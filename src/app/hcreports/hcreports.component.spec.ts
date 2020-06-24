import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcreportsComponent } from './hcreports.component';

describe('HcreportsComponent', () => {
  let component: HcreportsComponent;
  let fixture: ComponentFixture<HcreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
