import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evenement } from 'src/model/evenement';
import { EvenementService } from 'src/service/evenement/evenement.service';

@Component({
  selector: 'app-delete-evenement',
  templateUrl: './delete-evenement.component.html',
  styleUrls: ['./delete-evenement.component.css']
})
export class DeleteEvenementComponent {

  constructor(
    
    public dialogRef: MatDialogRef<DeleteEvenementComponent>,
    private evenementService: EvenementService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public evenement: Evenement
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  onDeleteClick(): void {
    // console.log("Componenent delete");
    // console.log("id: "+this.client.idCient);
    this.evenementService.deleteEvenement(this.evenement.idEvent).subscribe(
      (response) => {
        // console.log('Client deleted successfully:', response);
        this.dialogRef.close(true);
        this.showSnackBar('Hotel deleted successfully');
       
      },
      (error) => {
        console.error('Error deleting hotel:', error);
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
