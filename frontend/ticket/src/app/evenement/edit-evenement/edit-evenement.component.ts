import { Component, Inject } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evenement } from 'src/model/evenement';
import { EvenementService } from 'src/service/evenement/evenement.service';

@Component({
  selector: 'app-edit-evenement',
  templateUrl: './edit-evenement.component.html',
  styleUrls: ['./edit-evenement.component.css']
})
export class EditEvenementComponent {

  constructor(private dialog: MatDialog, private evenementService: EvenementService, public dialogRef: MatDialogRef<EditEvenementComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Evenement) {
      this.evenement=data;
      console.log("client selected date formData: "+data.date);
     }
     evenement: Evenement | any;
     selectedDate: Date | undefined | null ;
     updateEvent(formData: any): void {
      console.log("event selected nom formData: "+formData.nom);
      //console.log("client selected tel formData: "+formData.tel);
      this.evenement.nom = formData.nom;
     this.evenement.lieu= formData.lieu;
     this.evenement.description= formData.description;
     this.evenement.type=formData.type;
     this.evenement.nbTicket= formData.nbTicket;
     this.evenement.date= formData.date;
    this.evenement.prix= parseFloat(formData.prix);
    this.evenement.date = this.selectedDate?.toISOString().split('T')[0] ?? ''; // Format as "YYYY-MM-DD"


      console.log("event update comp fct")
      this.evenementService.updateEvenement(this.evenement).subscribe(
        (response) => {
          console.log('After response event updated successfully:', response);
          this.dialogRef.close(this.evenement);
          this.showSnackBar('event updated successfully');
        },
        (error) => {
          console.error('Error updating event:', error);
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

      // Event handler for date change
      onDateChange(event: MatDatepickerInputEvent<Date>): void {
        this.selectedDate = event.value;
        console.log('Selected Date:', this.selectedDate);
        // You can perform additional actions with the selected date if needed
      }

}
