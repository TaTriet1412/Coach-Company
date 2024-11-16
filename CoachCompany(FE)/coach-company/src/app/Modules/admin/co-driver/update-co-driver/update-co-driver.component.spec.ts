import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoDriverComponent } from './update-co-driver.component';

describe('UpdateCoDriverComponent', () => {
  let component: UpdateCoDriverComponent;
  let fixture: ComponentFixture<UpdateCoDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCoDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCoDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
