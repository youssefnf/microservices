import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationLogoutComponent } from './validation-logout.component';

describe('ValidationLogoutComponent', () => {
  let component: ValidationLogoutComponent;
  let fixture: ComponentFixture<ValidationLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationLogoutComponent]
    });
    fixture = TestBed.createComponent(ValidationLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
