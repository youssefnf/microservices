import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEvenementComponent } from './edit-evenement.component';

describe('EditEvenementComponent', () => {
  let component: EditEvenementComponent;
  let fixture: ComponentFixture<EditEvenementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEvenementComponent]
    });
    fixture = TestBed.createComponent(EditEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
