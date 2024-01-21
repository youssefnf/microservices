import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Evenement } from 'src/model/evenement';
import { EvenementService } from 'src/service/evenement/evenement.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-evenement',
  templateUrl: './add-evenement.component.html',
  styleUrls: ['./add-evenement.component.css']
})
export class AddEvenementComponent {
  constructor(private dialog: MatDialog, private evenementService: EvenementService, private snackBar: MatSnackBar
    ,public dialogRef: MatDialogRef<AddEvenementComponent>) { }

    evenement: Evenement ={
      idEvent: 0,
      nom: '',
      lieu: '',
      description: '',
      type: '',
      nbTicket: 0,
      prix: 0,
      date: ''
    }
    showSnackBar(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    } 

    // addNewevEnementl(evenementData: Evenement) {

    //   console.log("date : "+ evenementData.date);
    //   this.evenementService.addEvenement(evenementData).subscribe(
    //     (response) => {
        
    //       console.log('New event added successfully:', response);
    //       this.showSnackBar('Formateur Ajouté');
    //       this.dialogRef.close();
    //     },
    //     (error) => {
    //       console.error('Error adding new event:', error);
    //       this.dialogRef.close();
    //     }
    //   );
    // }

    selectedDate: Date | undefined | null ;

    addNewevEnementl(evenementData: Evenement) {
      // Assign the selected date to the evenementData
     evenementData.date = this.selectedDate?.toISOString().split('T')[0] ?? ''; // Format as "YYYY-MM-DD"
    
      console.log("date : " + evenementData.date);
      this.evenementService.addEvenement(evenementData).subscribe(
        (response) => {
          console.log('New event added successfully:', response);
          this.showSnackBar('Event Ajouté');
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error adding new event:', error);
          this.dialogRef.close();
        }
      );
    }

  

    // Event handler for date change
    onDateChange(event: MatDatepickerInputEvent<Date>): void {
      this.selectedDate = event.value;
      console.log('Selected Date:', this.selectedDate);
      // You can perform additional actions with the selected date if needed
    }
}
