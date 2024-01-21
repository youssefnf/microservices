import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/model/client';
import { Evenement } from 'src/model/evenement';
import { Reservation } from 'src/model/reservation';
import { ClientService } from 'src/service/client/client.service';
import { EvenementService } from 'src/service/evenement/evenement.service';
import { ReservationService } from 'src/service/reservation/reservation.service';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';
import { DeleteReservationComponent } from '../delete-reservation/delete-reservation.component';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent {

  @Input() headerTitle: string = 'Catalogue des reservations'; // Define headerTitle as an @Input property
  @Input() addButtonLabel: string = 'Reservation';
  displayedColumns: string[] = [
    'ID',
    'Client',
    'Evenement',
    'Nombre de ticket',
    'Prix',
    'Action',
  ];

  nb: number | any;
  pageNumber: number = 0;
  sizePage: number = 5;
  client: string = '';
  description: string = '';
  evenement: string = '';
  prix: number = 0;
  nbTicket: number = 0;

  reservationControl: any;
  selectedReservation: Reservation | null = null;

  clients:Client[]=[];
  evenements:Evenement[]=[];
  reservations: Reservation[] = [];
  dataSource = new MatTableDataSource<Reservation>(this.reservations);

  selectedClient: string ='';
  selectedEvenement: string ='';

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private evenementService: EvenementService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchReservation();
    this.fetchClient()
    this.fetchEvenement()
    this.refresh()
  }
  refresh(): void {
    this.fetchReservation();
  }
  
  defaultSelectedClient = '';
  defaultSelectedEvenement = '';
  defaultNbTickets = 0;
  defaultPrix = 0;

  resetFields() {
    // Réinitialiser les valeurs des champs aux valeurs par défaut

    this.nbTicket = this.defaultNbTickets;
    this.selectedEvenement = this.defaultSelectedEvenement;
    this.selectedClient = this.defaultSelectedClient;
    this.prix = this.defaultPrix;
  
    this.fetchReservation()
    this.sizePage = 5;
    this.pageNumber = 0;
    
  }

  fetchReservation(): void {
    this.reservationService.getAllReservation(this.pageNumber, this.sizePage).subscribe(
      (data: any) => {
        this.nb = data.totalElements;
        this.reservations = data.content;
        this.dataSource.data = this.reservations;
      },
      (error) => {
        console.error('Error fetching reservation:', error);
      }
    );
  }
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  fetchEvenement() {
    this.evenementService.getAllEvenement(this.pageNumber, this.sizePage)
      .subscribe(
        (data: any) => {
          this.evenements = data.content;
          this.nb = data.totalElements;
        },
        (error) => {
          //this.showSpinner=true
          console.error('Error fetching evenement:', error);
        }
      );
  } 

  fetchClient() {
    this.clientService.getAllClient(this.pageNumber, this.sizePage)
      .subscribe(
        (data: any) => {
          this.clients = data.content;
          this.nb = data.totalElements;
        },
        (error) => {
          //this.showSpinner=true
          console.error('Error fetching client:', error);
        }
      );
  }
  onPageChange(event: PageEvent) {
    
    this.sizePage = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.fetchReservation();
    this.fetchClient();
    this.fetchEvenement();
  }

  openEditDialog(reservation: Reservation): void {
    this.selectedReservation = reservation;
    const dialogRef = this.dialog.open(EditReservationComponent, {
      maxWidth: '100%',
      height: '350px',
      data: reservation,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchReservation();
      }
    });
  }
  openDeleteDialog(reservation: Reservation): void {
    const dialogRef = this.dialog.open(DeleteReservationComponent, {
      data: reservation,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("test")
        this.fetchReservation();
      }
    });
  }


}
