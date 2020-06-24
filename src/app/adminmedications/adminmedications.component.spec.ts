import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmedicationsComponent } from './adminmedications.component';

describe('AdminmedicationsComponent', () => {
  let component: AdminmedicationsComponent;
  let fixture: ComponentFixture<AdminmedicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmedicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmedicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
