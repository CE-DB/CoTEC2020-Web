import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailycasesgraphComponent } from './dailycasesgraph.component';

describe('DailycasesgraphComponent', () => {
  let component: DailycasesgraphComponent;
  let fixture: ComponentFixture<DailycasesgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailycasesgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailycasesgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
