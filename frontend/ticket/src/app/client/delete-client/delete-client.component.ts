import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/model/client';
import { ClientService } from 'src/service/client/client.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent {

  constructor(
    
    public dialogRef: MatDialogRef<DeleteClientComponent>,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public client: Client
  ) {}

  onCancelClick(): void {
    console.log("fffffff", this.client.nom)
    this.dialogRef.close(false);
  }
  onDeleteClick(): void {
    console.log("Componenent delete");
    console.log("id: "+this.client.idClient);
    console.log("nom: "+this.client.nom);
    this.clientService.deleteClient(this.client.idClient).subscribe(
      (response) => {
        console.log('Client deleted successfully:', response);
        this.dialogRef.close(true);
        this.showSnackBar('Client deleted successfully');
       
      },
      (error) => {
        console.error('Error deleting client:', error);
        this.dialogRef.close(false);
      }
    );
  }
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }

}
