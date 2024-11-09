import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseChairComponent } from './choose-chair.component';

describe('ChooseChairComponent', () => {
  let component: ChooseChairComponent;
  let fixture: ComponentFixture<ChooseChairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseChairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
