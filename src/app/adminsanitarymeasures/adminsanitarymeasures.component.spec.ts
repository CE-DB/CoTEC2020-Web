import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsanitarymeasuresComponent } from './adminsanitarymeasures.component';

describe('AdminsanitarymeasuresComponent', () => {
  let component: AdminsanitarymeasuresComponent;
  let fixture: ComponentFixture<AdminsanitarymeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsanitarymeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsanitarymeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
