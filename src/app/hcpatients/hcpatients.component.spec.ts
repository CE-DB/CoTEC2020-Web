import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpatientsComponent } from './hcpatients.component';

describe('HcpatientsComponent', () => {
  let component: HcpatientsComponent;
  let fixture: ComponentFixture<HcpatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcpatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
