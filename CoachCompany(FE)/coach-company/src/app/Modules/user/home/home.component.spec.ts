import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserComponent } from './home.component';

describe('HomeUserComponent', () => {
  let component: HomeUserComponent;
  let fixture: ComponentFixture<HomeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
