import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/model/client';
import { Evenement } from 'src/model/evenement';
import { Reservation } from 'src/model/reservation';
import { ClientService } from 'src/service/client/client.service';
import { EvenementService } from 'src/service/evenement/evenement.service';
import { ReservationService } from 'src/service/reservation/reservation.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent  implements OnInit {
  selectedClient: string | any;
  selectedEvenement: string | any;
  clients: Client | any;
  evenements: Evenement | any;

  constructor(private dialog: MatDialog, private clientService: ClientService, 
    private evenementService: EvenementService, 
    private reservationService: ReservationService, 
    public dialogRef: MatDialogRef<AddReservationComponent>,
    private snackBar: MatSnackBar) { }

    reservation: Reservation ={ 
      idReservation: 0,
      nbTicket: 0,
      client: {} as Client,
      event: {} as Evenement
    }
  ngOnInit(): void {
    this.fetchClient()
    this.fetchEvenement()
  }
  ngAfterViewInit() {
    this.fetchClient()
    this.fetchEvenement()
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
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  // addNewReservation(reservationData: Reservation) {
  //   const clientId = this.getClientIdByName(this.selectedClient);
  //   const evenementId = this.getEvenementIdByName(this.selectedEvenement);
    
  //   reservationData.client.idClient = clientId;
  //   reservationData.event.idEvent= evenementId;

  //   console.log("event: ", reservationData.event.nom);
  //   console.log("client: ", reservationData.client.nom);
  //   this.reservationService.addReservation(reservationData).subscribe(
  //     (response) => {
  //       console.log('New reservation added successfully:', response);
  //       this.showSnackBar('Reservation Ajoutée');
  //       this.dialogRef.close();
  //     },
  //     (error) => {
  //       console.error('Error adding new reservation:', error);
  //       this.dialogRef.close();
  //     }
  //   );
  // }

  addNewReservation(reservationData: Reservation) {
    const clientId = this.getClientIdByName(this.selectedClient);
    const evenementId = this.getEvenementIdByName(this.selectedEvenement);
  
    // Ensure reservationData.client and reservationData.event are initialized
    reservationData.client = reservationData.client || {} as Client;
    reservationData.event = reservationData.event || {} as Evenement;
    const ticket= reservationData.nbTicket;

    reservationData.client.idClient = clientId;
    reservationData.event.idEvent = evenementId;
    reservationData.nbTicket =ticket;
    //reservationData.nbTicket=reservationData.nbTicket;
  
    
    console.log("event: ", reservationData.event.nom);
    console.log("client: ", reservationData.client.nom);
    console.log("nb: ", ticket);
    this.reservationService.addReservation(reservationData).subscribe(
      (response) => {
        console.log('New reservation added successfully:', response);
        this.showSnackBar('Reservation Ajoutée');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error adding new reservation:', error);
        this.dialogRef.close();
      }
    );
  }


  getClientIdByName(clientName: string): number {
    const selectedClient = this.clients.find((clt: { nom: string; }) => clt.nom === clientName);
    return selectedClient ? selectedClient.idClient : -1;

  }

  
  getEvenementIdByName(evenementName: string): number {
    const selectedEvenement = this.evenements.find((evt: { nom: string; }) => evt.nom === evenementName);
    return selectedEvenement ? selectedEvenement.idEvent : -1;

  }
}
