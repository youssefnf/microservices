package ma.ticket.reservation.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
     Long idEvent;
     String nom;
     String lieu;
     String description;
     String type;
     Long nbTicket;
     double prix;
     LocalDate date;

}
