import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterDocPage } from './filter-doc.page';

describe('FilterDocPage', () => {
  let component: FilterDocPage;
  let fixture: ComponentFixture<FilterDocPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
