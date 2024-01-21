import { Client } from "./client";
import { Evenement } from "./evenement";
export interface Reservation {
       idReservation : number;

      nbTicket : number;

      client : Client;

      event: Evenement;
}