package ma.ticket.reservation.controller;

import jakarta.ws.rs.NotFoundException;
import ma.ticket.reservation.entity.Reservation;
import ma.ticket.reservation.models.ReservationResponse;
import ma.ticket.reservation.service.ReservationService;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all/{pagenumber}/{pagesize}")
    public ResponseEntity<Page<ReservationResponse>> resPages(@PathVariable int pagenumber, @PathVariable int pagesize)
    {
        Page<ReservationResponse> reservations = reservationService.findAllRes(pagenumber, pagesize);
        return ResponseEntity.ok(reservations);

    }

    @PostMapping("/ajouter")
    public ResponseEntity<ReservationResponse> addNewVoiture(@RequestBody ReservationResponse reservationRequest) {
        try {
            ReservationResponse addedCar = reservationService.addNewReservation(reservationRequest);
            return new ResponseEntity<>(addedCar, HttpStatus.CREATED);
        } catch (NotFoundException e) {
            // Handle the case where the client is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (ServiceException e) {
            // Handle other exceptions or validation errors
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/modifier")
    public ResponseEntity<ReservationResponse> editVoiture(@RequestBody Reservation updatedReservation) {
        ReservationResponse editedReservation = reservationService.editReservation(updatedReservation);
        return new ResponseEntity<>(editedReservation, HttpStatus.OK);
    }

   @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<String> supprimerClient(@PathVariable Long id)
    {
        boolean voiture = reservationService.deleteReservation(id);
        if (voiture)
        {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }



    @GetMapping
    public List<ReservationResponse> findAll() {
        return reservationService.findAll();
    }


    
}
