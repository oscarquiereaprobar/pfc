import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFormComponent } from './form.component';

describe('FormComponent', () => {
  let component: TripFormComponent;
  let fixture: ComponentFixture<TripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
