import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlogComponent } from './detail-blog.component';

describe('DetailBlogComponent', () => {
  let component: DetailBlogComponent;
  let fixture: ComponentFixture<DetailBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
