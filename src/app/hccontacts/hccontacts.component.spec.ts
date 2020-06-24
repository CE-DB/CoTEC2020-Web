import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HccontactsComponent } from './hccontacts.component';

describe('HccontactsComponent', () => {
  let component: HccontactsComponent;
  let fixture: ComponentFixture<HccontactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HccontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HccontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
