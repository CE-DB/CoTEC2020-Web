import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminregionsComponent } from './adminregions.component';

describe('AdminregionsComponent', () => {
  let component: AdminregionsComponent;
  let fixture: ComponentFixture<AdminregionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminregionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminregionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
