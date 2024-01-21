import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main/main.component';
import { ListEvenementComponent } from './evenement/list-evenement/list-evenement.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { ListReservationComponent } from './reservation/list-reservation/list-reservation.component';
import { ConnexionComponent } from './login/connexion/connexion.component';

const routes: Routes = [

  {path:'main',component:MainComponent},
  {path:'evenement',component:ListEvenementComponent},
  {path:'client',component:ListClientComponent},
  {path:'reservation',component:ListReservationComponent},
  {path:'',component:ConnexionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
