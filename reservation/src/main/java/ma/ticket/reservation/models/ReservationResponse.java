package ma.ticket.reservation.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.ticket.reservation.entity.Client;
import ma.ticket.reservation.entity.Event;
import org.springframework.web.bind.annotation.CrossOrigin;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationResponse {
      Long idReservation;

     Long nbTicket;

     Client client;

     Event event;

}
