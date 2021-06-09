import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationformComponent } from './allocationform.component';

describe('AllocationformComponent', () => {
  let component: AllocationformComponent;
  let fixture: ComponentFixture<AllocationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
