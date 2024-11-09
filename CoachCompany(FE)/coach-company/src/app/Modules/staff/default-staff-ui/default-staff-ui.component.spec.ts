import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultStaffUiComponent } from './default-staff-ui.component';

describe('DefaultStaffUiComponent', () => {
  let component: DefaultStaffUiComponent;
  let fixture: ComponentFixture<DefaultStaffUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultStaffUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultStaffUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
