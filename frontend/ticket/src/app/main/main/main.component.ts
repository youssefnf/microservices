import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AddClientComponent } from 'src/app/client/add-client/add-client.component';
import { AddEvenementComponent } from 'src/app/evenement/add-evenement/add-evenement.component';
import { ValidationLogoutComponent } from 'src/app/login/validation-logout/validation-logout.component';
import { AddReservationComponent } from 'src/app/reservation/add-reservation/add-reservation.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('animation', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in')),
    ]),
  ],
})
export class MainComponent {

  constructor(public dialog: MatDialog,private router: Router,private cdr: ChangeDetectorRef){
  
  }
  items: MenuItem[] | any;

  ngOnInit() {
    this.isMainComponentEnabled = true;
    this.isLoading = true;
      this.isTestComponentEnabled = false;
      this.isMainComponentEnabled = true;
  
      this.loadingProgress = 0;
      const progressInterval = setInterval(() => {
        if (this.loadingProgress < 100) {
          this.loadingProgress += 10; // Adjust this value to control the loading progress
        } else {
          clearInterval(progressInterval);
          this.isLoading = false;
        }
      }, 100);
  
   // this.test()

    }
    isLoading: boolean = false;

    pageTitle: string = 'Catalogue des clients';
    addButtonLabel: string = 'Client';
    @Output() tabChange = new EventEmitter<number>();
    @ViewChild('listClientTab') listClientTab: any; 
    @ViewChild('listEvenementTab') listEvenementTab: any; 
    @ViewChild('listReservationTab') listReservationTab: any; 
    headerTitle: string = 'Catalogue des clients';
    currentTabIndex: number = 0;
    isSidebarOpenedFull : boolean = true;
    isSidebarOpened = true;
    isSidebarHovered = false;
    isTestComponentEnabled: boolean = true;
    isMainComponentEnabled: boolean = false;
    expandSidebar() {
      this.isSidebarHovered = true;
    }
    ngAfterViewInit() {
   
      //this.test()
          this.currentTabIndex
        }

        isHovered: boolean = false;
        showText(event: MouseEvent) {
          this.isHovered = true;
        }
      
        hideText(event: MouseEvent) {
          this.isHovered = false;
        }
        collapseSidebar() {
          this.isSidebarHovered = false;
        }
        isReportingVisible: boolean = false;
        loadingProgress: number = 0;

        main() {
          this.isLoading = true;
          this.isTestComponentEnabled = false;
          this.isMainComponentEnabled = true;
      
          this.loadingProgress = 0;
          const progressInterval = setInterval(() => {
            if (this.loadingProgress < 100) {
              this.loadingProgress += 10; // Adjust this value to control the loading progress
            } else {
              clearInterval(progressInterval);
              this.isLoading = false;
            }
          }, 100);
        }
        onTabChange(event: any) {
   
          switch (event.index) {
            case 0:
              this.pageTitle = 'Catalogue des clients';
              this.addButtonLabel = 'Client';
              break;
            
            case 1:
              this.pageTitle = 'Catalogue des evenements';
              this.addButtonLabel = 'Evenement';
              break;
          case 2:
              this.pageTitle = 'Catalogue des reservations';
              this.addButtonLabel = 'Reservation';
              break;
              
            break;
            default:
              this.pageTitle = 'Catalogue des clients';
              this.addButtonLabel = 'Client';
              break;
          }
          this.tabChange.emit(event.index);
          this.currentTabIndex = event.index;
          this.refreshTabComponents();
        }

        refreshTabComponents(): void {
    
          if (this.listClientTab && this.listClientTab.refresh) {
            this.listClientTab.refresh();
          }
          if (this.listEvenementTab && this.listEvenementTab.refresh) {
            this.listEvenementTab.refresh();
          }
          if (this.listReservationTab && this.listReservationTab.refresh) {
            this.listReservationTab.refresh();
          }
       
         
          this.cdr.detectChanges();
        }

        openAddDialog(): void {
          if(this.pageTitle=='Catalogue des clients'){
            this.openAddClientDialog();
          }
         
          if(this.pageTitle=='Catalogue des evenements'){
            this.openAddEvenementDialog();
          }
         
          if (this.pageTitle == 'Catalogue des reservations') {
            this.openAddReservationDialog();
      
          }
        }
        openAddClientDialog(): void {
          const dialogRefClient = this.dialog.open(AddClientComponent, {
            width: 'auto',
            height: 'auto',
          });
          dialogRefClient.afterClosed().subscribe(result => {
            this.listClientTab.refresh();
          });
      
        }
        
        openAddReservationDialog(): void {
          const dialogRef = this.dialog.open(AddReservationComponent, {
            maxWidth: '100%',
            height: 'auto',
            minWidth: '1100px',
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              setTimeout(() => {
                this.listReservationTab.refresh();
              });
            }
          });
        }

        openAddEvenementDialog(): void {
          const dialogRef = this.dialog.open(AddEvenementComponent, {
            maxWidth: '100%',
            height: 'auto',
            minWidth: '1100px',
          });
      
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              setTimeout(() => {
                this.refreshTabComponents();
              });
            }
          });
        }

        logout() {
          // Implement your login logic here
      
          // For demo purposes, always redirect to /main
         // this.router.navigate(['']);

         const dialogRef = this.dialog.open(ValidationLogoutComponent, {
          maxWidth: '100%',
          height: 'auto',
          minWidth: '300px',
        });
        }
  
}
