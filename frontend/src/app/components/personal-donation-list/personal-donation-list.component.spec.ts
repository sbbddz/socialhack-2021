import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDonationListComponent } from './personal-donation-list.component';

describe('PersonalDonationListComponent', () => {
  let component: PersonalDonationListComponent;
  let fixture: ComponentFixture<PersonalDonationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDonationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDonationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
