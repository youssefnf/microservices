import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddClientComponent } from './client/add-client/add-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { ListEvenementComponent } from './evenement/list-evenement/list-evenement.component';
import { AddEvenementComponent } from './evenement/add-evenement/add-evenement.component';
import { EditEvenementComponent } from './evenement/edit-evenement/edit-evenement.component';
import { DeleteEvenementComponent } from './evenement/delete-evenement/delete-evenement.component';
import { AddReservationComponent } from './reservation/add-reservation/add-reservation.component';
import { EditReservationComponent } from './reservation/edit-reservation/edit-reservation.component';
import { DeleteReservationComponent } from './reservation/delete-reservation/delete-reservation.component';
import { ListReservationComponent } from './reservation/list-reservation/list-reservation.component';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common'; 
import { MatChipsModule } from '@angular/material/chips'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main/main.component';
import { ConnexionComponent } from './login/connexion/connexion.component';
import { ValidationLogoutComponent } from './login/validation-logout/validation-logout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent,
    ListClientComponent,
    ListEvenementComponent,
    AddEvenementComponent,
    EditEvenementComponent,
    DeleteEvenementComponent,
    AddReservationComponent,
    EditReservationComponent,
    DeleteReservationComponent,
    ListReservationComponent,
    MainComponent,
    ConnexionComponent,
    ValidationLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    HttpClientModule,
    MatCheckboxModule,
    MatChipsModule,
    CommonModule,
    MatNativeDateModule,MatDatepickerModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
