import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCrudComponent } from './layout-crud.component';

describe('LayoutCrudComponent', () => {
  let component: LayoutCrudComponent;
  let fixture: ComponentFixture<LayoutCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
