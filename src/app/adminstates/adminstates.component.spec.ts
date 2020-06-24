import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstatesComponent } from './adminstates.component';

describe('AdminstatesComponent', () => {
  let component: AdminstatesComponent;
  let fixture: ComponentFixture<AdminstatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminstatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
