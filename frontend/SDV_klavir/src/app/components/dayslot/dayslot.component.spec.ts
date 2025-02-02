import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayslotComponent } from './dayslot.component';

describe('DayslotComponent', () => {
  let component: DayslotComponent;
  let fixture: ComponentFixture<DayslotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayslotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
