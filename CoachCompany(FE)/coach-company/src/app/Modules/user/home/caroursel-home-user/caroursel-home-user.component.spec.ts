import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarourselHomeUserComponent } from './caroursel-home-user.component';

describe('CarourselHomeUserComponent', () => {
  let component: CarourselHomeUserComponent;
  let fixture: ComponentFixture<CarourselHomeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarourselHomeUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarourselHomeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
