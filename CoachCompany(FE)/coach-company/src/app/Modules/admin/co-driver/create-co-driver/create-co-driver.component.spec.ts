import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoDriverComponent } from './create-co-driver.component';

describe('CreateCoDriverComponent', () => {
  let component: CreateCoDriverComponent;
  let fixture: ComponentFixture<CreateCoDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCoDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCoDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
