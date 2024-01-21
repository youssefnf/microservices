package ma.ticket.reservation.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Client {
     Long idClient;
     String nom;
     String prenom;
     String tel;
     String email;
}
