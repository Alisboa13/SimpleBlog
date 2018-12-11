import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogFormPageComponent } from './blog-form-page.component';

describe('BlogFormPageComponent', () => {
  let component: BlogFormPageComponent;
  let fixture: ComponentFixture<BlogFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
