import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/service/client/client.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { Client } from 'src/model/client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {

  constructor(private dialog: MatDialog, private clientService: ClientService, public dialogRef: MatDialogRef<AddClientComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Client) {
      this.client=data;
      console.log(data.prenom)
     }
     client: Client | any;
     updateClient(formData: any): void {
      console.log("client selected nom formData: "+formData.nom);
      console.log("client selected tel formData: "+formData.tel);
      this.client.nom = formData.nom;
      this.client.prenom = formData.prenom;
      this.client.email=formData.email;
      this.client.tel= formData.tel;

      console.log("Client tel: "+this.client.tel)
      console.log("Client update comp fct")
      this.clientService.updateClient(this.client).subscribe(
        (response) => {
          console.log('After response client updated successfully:', response);
          this.dialogRef.close(this.client);
          this.showSnackBar('client updated successfully');
        },
        (error) => {
          console.error('Error updating client:', error);
        }
      );
    }
    showSnackBar(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }


}
