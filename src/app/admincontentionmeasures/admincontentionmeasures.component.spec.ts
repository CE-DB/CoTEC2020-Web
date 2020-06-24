import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincontentionmeasuresComponent } from './admincontentionmeasures.component';

describe('AdmincontentionmeasuresComponent', () => {
  let component: AdmincontentionmeasuresComponent;
  let fixture: ComponentFixture<AdmincontentionmeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincontentionmeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincontentionmeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
