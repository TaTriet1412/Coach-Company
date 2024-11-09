import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAdminUiComponent } from './default-admin-ui.component';

describe('DefaultAdminUiComponent', () => {
  let component: DefaultAdminUiComponent;
  let fixture: ComponentFixture<DefaultAdminUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultAdminUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultAdminUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
