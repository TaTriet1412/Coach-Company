import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserComponent } from './header.component';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
