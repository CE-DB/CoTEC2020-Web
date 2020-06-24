import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhealthcentersComponent } from './adminhealthcenters.component';

describe('AdminhealthcentersComponent', () => {
  let component: AdminhealthcentersComponent;
  let fixture: ComponentFixture<AdminhealthcentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminhealthcentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminhealthcentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
