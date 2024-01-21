import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-logout',
  templateUrl: './validation-logout.component.html',
  styleUrls: ['./validation-logout.component.css']
})
export class ValidationLogoutComponent {
  constructor(
    
    public dialogRef: MatDialogRef<ValidationLogoutComponent>, private router: Router
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  Logout(): void {
    this.router.navigate([''])

    this.onCancelClick();
    
  }

}
