import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessContactComponent } from './process-contact.component';

describe('ProcessContactComponent', () => {
  let component: ProcessContactComponent;
  let fixture: ComponentFixture<ProcessContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
