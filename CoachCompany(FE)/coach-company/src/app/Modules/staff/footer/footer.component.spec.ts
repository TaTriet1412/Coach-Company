import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterStaffComponent } from './footer.component';

describe('FooterStaffComponent', () => {
  let component: FooterStaffComponent;
  let fixture: ComponentFixture<FooterStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
