import { Component,ViewEncapsulation  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/service/admin/admin.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  encapsulation: ViewEncapsulation.None  // Add this line for styling encapsulation

})
export class ConnexionComponent {
  loginForm: FormGroup;
  constructor(private router: Router, private adminService: AdminService, private snackBar: MatSnackBar,private formBuilder: FormBuilder) 
  {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      mdp: ['', Validators.required]
    });
  }

  username: string = '';
  mdp: string = '';
  exist : boolean | undefined;

 
  // loginExist(username: string, mdp: string): void {
  //   this.adminService.verifyLogin(username, mdp)
  //     .subscribe((result: boolean) => {
  //       if (result) {
  //         // Login successful
  //         console.log('Login successful');
  //         this.showSnackBar('Login successful');
  //         this.router.navigate(['/main']);
  //       } else {
  //         // Login failed
  //         console.log('Login failed');
  //         this.showSnackBar('Login failed');
  //       }
  //     }, error => {
  //       // Handle error
  //       console.error('Error:', error);
  //     });
  // }

  loginExist(): void { 
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const mdp = this.loginForm.value.mdp;
      
      this.adminService.verifyLogin(username, mdp)
          .subscribe((result: boolean) => {
            if (result) {
              // Login successful
              console.log('Login successful');
              this.showSnackBar('Login successful');
              this.router.navigate(['/main']);
            } else {
              // Login failed
              console.log('Login failed');
              this.showSnackBar('Login failed');
            }
          }, error => {
            // Handle error
            console.error('Error:', error);
          });
    
    } else {
      // Form is invalid, display error messages or take appropriate action
      // For example: mark the fields as touched to trigger error messages
      this.loginForm.markAllAsTouched();
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}
