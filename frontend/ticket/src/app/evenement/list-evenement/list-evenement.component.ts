import { Component, Input, ViewChild } from '@angular/core';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Evenement } from 'src/model/evenement';
import { EvenementService } from 'src/service/evenement/evenement.service';
import { EditEvenementComponent } from '../edit-evenement/edit-evenement.component';
import { DeleteEvenementComponent } from '../delete-evenement/delete-evenement.component';

@Component({
  selector: 'app-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.css']
})
export class ListEvenementComponent {
  @Input() headerTitle: string = 'Evenement';
  //@Input() addButtonLabel: string = 'Default Button Label';
  evenements: Evenement[] = [];


  displayedColumns: string[] = [
    'ID',
    'Nom',
    'Lieu',
    'Description',
    'Type',
    'Nombre de ticket',
    'Date',
    'Prix',
    'Action',
  ];

  nb: number | any;
  pageNumber: number = 0;
  sizePage: number = 5;
  nom: string = '';
  lieu: string = '';
  description: string = '';
  type: string = '';
  date: any;
  nbTicket: number = 0;
  prix: number = 0;
  evenementControl: any;
  selectedEvenement: Evenement | null = null;

  constructor(  private evenementService: EvenementService,
    public dialog: MatDialog){}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild('picker') picker: MatDateRangeInput<Date> | any;

    ngOnInit() {
      this.refresh();
      this.fetchEvenement();
    }
    refresh(): void {
      this.fetchEvenement();
    }

  defaultnom: string = '';
  defaultlieu: string = '';
  defaultdescription: string = '';
  defaulttype: string = '';
  defaultDt = null;
  defaultnbTicket: number = 0;
  defaultprix:  number = 0;

resetFields() {
    // Réinitialiser les valeurs des champs aux valeurs par défaut
    this.nom = this.defaultnom;
    this.lieu = this.defaultlieu;
    this.description = this.defaultdescription;
    this.type = this.defaulttype;
    this.date = this.defaultDt;
    this.nbTicket = this.defaultnbTicket;
    this.prix = this.defaultprix;
    this.evenementControl=undefined
    this.fetchEvenement();
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
  


  onPageChange(event: PageEvent) {
    
    this.sizePage = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.fetchEvenement();
  }

  openEditDialog(evenement: Evenement): void {
    this.selectedEvenement = evenement;
    
    const dialogRef = this.dialog.open(EditEvenementComponent, {
      maxWidth: '150%',
      height: '400px',
      data: evenement,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchEvenement();
      }
    });
  }

  openDeleteDialog(evenement: Evenement): void {
    const dialogRef = this.dialog.open(DeleteEvenementComponent, {
      data: evenement,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Supprimer event fct")
        this.fetchEvenement();
      }
    });
  }
}
