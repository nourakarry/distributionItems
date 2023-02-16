import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyManagementComponent } from './family-management.component';

describe('ErrorsComponent', () => {
  let component: FamilyManagementComponent;
  let fixture: ComponentFixture<FamilyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamilyManagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
