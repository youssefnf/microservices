import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from 'src/service/reservation/reservation.service';
import { DeleteReservationComponent } from '../delete-reservation/delete-reservation.component';
import { Reservation } from 'src/model/reservation';
import { Client } from 'src/model/client';
import { Evenement } from 'src/model/evenement';
import { ClientService } from 'src/service/client/client.service';
import { EvenementService } from 'src/service/evenement/evenement.service';
import { ReservationUpdate } from 'src/model/reservationUpdate';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent  {
  // selectedClient1: Client | any;
  // selectedEvenement1: Evenement | any;
  selectedClient1: number | undefined; // Change the type to number to store the client ID
  selectedEvenement1: number | undefined; // Change the type to number to store the event ID
 
 
  reservation: ReservationUpdate;
  clients: Client[] = [];
  evenements: Evenement[] = [];
   n: number =5;
  constructor(
    private dialog: MatDialog, 
    private reservationService: ReservationService,
     public dialogRef: MatDialogRef<EditReservationComponent>,
    private snackBar: MatSnackBar,
    private clientService: ClientService,
    private evenementService: EvenementService,
    @Inject(MAT_DIALOG_DATA) public data: ReservationUpdate) {
      
      this.reservation=data;
      //console.log("nom:: "+ this.data.client.nom)
      console.log("nnbticket:: "+ this.data.nbTicket)
      console.log("event:: "+ this.data.idEvenet)

      console.log("data:: "+ this.data)
      this.fetchEvenement();
      this.fetchClient();
     }


    fetchEvenement() {
      console.log("call event from edit res ts");
      this.evenementService.getAllEvenementList()
        .subscribe(
          (data: Evenement []) => {
            this.evenements = data;
            console.log("Clients:", this.evenements);


            // console.log("call insidde fetch event")
            // console.log(this.evenements)

          },
          (error) => {
            //this.showSpinner=true
            console.error('Error fetching evenements:', error);
          }
        );
    }

    

    fetchClient() {
      this.clientService.getAllClientList().subscribe(
        (data: Client[]) => {
          if (data) {
            this.clients = data;
            console.log("Clients:", this.clients);
          } else {
            console.error('Invalid data structure for clients:', data);
          }
        },
        (error) => {
          console.error('Error fetching clients:', error);
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

    // getClientById(nom: any): any {
    //   console.log("getClientById")
    //   const idclt = this.clients.find(client => client.nom === nom);

    //   console.log("getClientById fct idclt: ", idclt)
    //   return idclt;
    // }

    // getEventById(nom: any): any {
    //   console.log("getEventById")
    //   const idEnt = this.evenements.find(evenement => evenement.nom === nom);
    //   return idEnt;
    // }

   

    updateReservation(formData: any): void {
      // console.log("Form Data:", formData);
      // console.log("formData.nbTicket:", formData.nbTicket);
      // console.log("formData.selectedClient1: "+ formData.selectedClient1)
      // console.log("formData.selectedEvenement1: ",formData.selectedEvenement1)
      
      // this.reservation.client =formData.selectedClient1;
      // this.reservation.event =formData.selectedEvenement1;
      // this.reservation.nbTicket =formData.nbTicket;
      // console.log("reservation.client")
      // console.log(this.reservation.client)
      // console.log("reservation.event")
      // console.log(this.reservation.event)

      //console.log("Form Data:", formData);
    console.log("formData.nbTicket:", formData.nbTicket);
    console.log("formData.selectedClient1: ", formData.selectedClient1);
    console.log("formData.selectedEvenement1: ", formData.selectedEvenement1);

    // Assign the selected client and event IDs to the reservation object
    this.reservation.idClient = formData.selectedClient1  ;
    this.reservation.idEvenet = formData.selectedEvenement1 ;
    this.reservation.nbTicket = formData.nbTicket;
    
    console.log("reservation.client");
    console.log(this.reservation.idClient);
    console.log("reservation.event");
    console.log(this.reservation.idEvenet);
 
      this.reservationService.updateReservation(this.reservation).subscribe(
        (response) => {
          
          console.log('reservation updated successfully:', response);
          this.dialogRef.close(this.reservation);
          this.showSnackBar('reservation updated successfully');
        },
        (error) => {
          console.error('Error updating session:', error);
        }
      );
    }



}
