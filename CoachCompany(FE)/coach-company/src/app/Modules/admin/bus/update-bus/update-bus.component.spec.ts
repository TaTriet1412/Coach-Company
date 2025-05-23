import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusComponent } from './update-bus.component';

describe('UpdateBusComponent', () => {
  let component: UpdateBusComponent;
  let fixture: ComponentFixture<UpdateBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
