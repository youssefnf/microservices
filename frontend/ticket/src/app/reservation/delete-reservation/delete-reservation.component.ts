import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from 'src/model/reservation';
import { ReservationService } from 'src/service/reservation/reservation.service';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent {
  constructor(
    
    public dialogRef: MatDialogRef<DeleteReservationComponent>,
    private reservationService: ReservationService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public reservation: Reservation
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  onDeleteClick(): void {
    // console.log("Componenent delete");
    // console.log("id: "+this.client.idCient);
    this.reservationService.deleteReservation(this.reservation.idReservation).subscribe(
      (response) => {
        // console.log('Client deleted successfully:', response);
        this.dialogRef.close(true);
        this.showSnackBar('reservation deleted successfully');
       
      },
      (error) => {
        console.error('Error deleting reservation:', error);
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
