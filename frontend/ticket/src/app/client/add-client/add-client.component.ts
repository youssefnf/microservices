import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/model/client';
import { ClientService } from 'src/service/client/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {

constructor(private dialog: MatDialog, private clientService: ClientService,private snackBar: MatSnackBar
    ,public dialogRef: MatDialogRef<AddClientComponent>) { }

    client : Client = {
      idClient: 0,
      nom: '',
      prenom: '',
      email: '',
      tel: ''
    }
    showSnackBar(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    addNewClient(clientData: Client) {
      this.clientService.addClient(clientData).subscribe(
        (response) => {
        
          console.log('New client added successfully:', response);
          this.showSnackBar('Client Ajouté');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error adding new client:', error);
          this.dialogRef.close();
        }
      );
    }
}
