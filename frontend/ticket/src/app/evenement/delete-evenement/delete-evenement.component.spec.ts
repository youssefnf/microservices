import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEvenementComponent } from './delete-evenement.component';

describe('DeleteEvenementComponent', () => {
  let component: DeleteEvenementComponent;
  let fixture: ComponentFixture<DeleteEvenementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteEvenementComponent]
    });
    fixture = TestBed.createComponent(DeleteEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
