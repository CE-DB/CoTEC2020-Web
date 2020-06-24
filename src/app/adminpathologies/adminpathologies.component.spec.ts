import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpathologiesComponent } from './adminpathologies.component';

describe('AdminpathologiesComponent', () => {
  let component: AdminpathologiesComponent;
  let fixture: ComponentFixture<AdminpathologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpathologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpathologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
