import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySpecificationComponent } from './category-specification.component';

describe('CategorySpecificationComponent', () => {
  let component: CategorySpecificationComponent;
  let fixture: ComponentFixture<CategorySpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySpecificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorySpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
