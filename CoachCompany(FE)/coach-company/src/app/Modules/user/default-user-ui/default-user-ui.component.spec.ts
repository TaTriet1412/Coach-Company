import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultUserUiComponent } from './default-user-ui.component';

describe('DefaultUserUiComponent', () => {
  let component: DefaultUserUiComponent;
  let fixture: ComponentFixture<DefaultUserUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultUserUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultUserUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
