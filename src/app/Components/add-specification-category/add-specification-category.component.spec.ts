import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecificationCategoryComponent } from './add-specification-category.component';

describe('AddSpecificationCategoryComponent', () => {
  let component: AddSpecificationCategoryComponent;
  let fixture: ComponentFixture<AddSpecificationCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSpecificationCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSpecificationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
