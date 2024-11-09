import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoDriverComponent } from './co-driver.component';

describe('CoDriverComponent', () => {
  let component: CoDriverComponent;
  let fixture: ComponentFixture<CoDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
