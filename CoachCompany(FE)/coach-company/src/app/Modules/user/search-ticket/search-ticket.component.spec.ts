import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTicketComponent } from './search-ticket.component';

describe('SearchTicketComponent', () => {
  let component: SearchTicketComponent;
  let fixture: ComponentFixture<SearchTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
