import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTableComponent } from './family-table.component';

describe('Error404Component', () => {
  let component: FamilyTableComponent;
  let fixture: ComponentFixture<FamilyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
