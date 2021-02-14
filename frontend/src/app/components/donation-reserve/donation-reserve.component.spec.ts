import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationReserveComponent } from './donation-reserve.component';

describe('DonationReserveComponent', () => {
  let component: DonationReserveComponent;
  let fixture: ComponentFixture<DonationReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationReserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
