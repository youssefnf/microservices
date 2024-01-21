package ma.ticket.reservation.service;

import jakarta.ws.rs.NotFoundException;
import ma.ticket.reservation.entity.Client;
import ma.ticket.reservation.entity.Event;
import ma.ticket.reservation.entity.Reservation;
import ma.ticket.reservation.models.ReservationResponse;
import ma.ticket.reservation.repository.ReservationRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
   private RestTemplate restTemplate;

    private static final String GET_FURL = "http://localhost:8888/MICROSERVICE-CLIENT";
    private static final String GET_SURL = "http://localhost:8888/MICROSERVICE-EVENT";

   public List<ReservationResponse> findAll() {
        List<Reservation> cars = reservationRepository.findAll();
        ResponseEntity<Client[]> response = restTemplate.getForEntity(GET_FURL + "/api/client/list", Client[].class);
        ResponseEntity<Event[]> response1 = restTemplate.getForEntity(GET_SURL + "/api/event", Event[].class);

        Client[] clients = response.getBody();
        Event[] events = response1.getBody();
        return cars.stream().map((Reservation reservation) -> mapToReservationResponse(reservation, clients,events)).toList();
    }



    public Page<ReservationResponse> findAllRes(int pageNumber, int pageSize) {
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            Page<Reservation> reservationsPage = reservationRepository.findAll(pageable);

            ResponseEntity<Client[]> response = restTemplate.getForEntity(GET_FURL + "/api/client/list", Client[].class);
            ResponseEntity<Event[]> response1 = restTemplate.getForEntity(GET_SURL + "/api/event", Event[].class);

            Client[] clients = response.getBody();
            Event[] events = response1.getBody();

            return reservationsPage.map(reservation -> mapToReservationResponse(reservation, clients, events));
        } catch (HttpClientErrorException e) {
            // Log the error details or handle it appropriately
            // You can also rethrow the exception or return a default response
            e.printStackTrace();
            throw e;
        }
    }

    private ReservationResponse mapToReservationResponse(Reservation reservation, Client[] clients, Event[] events) {
        Client foundClient = Arrays.stream(clients)
                .filter(client -> client.getIdClient().equals(reservation.getIdClient()))
                .findFirst()
                .orElse(null);

        Event foundEvent = Arrays.stream(events)
                .filter(event -> event.getIdEvent().equals(reservation.getIdEvenet()))
                .findFirst()
                .orElse(null);

        return ReservationResponse.builder()
                .idReservation(reservation.getIdReservation())
                .nbTicket(reservation.getNbTicket())
                .client(foundClient)
                .event(foundEvent)
                .build();
    }

    public ReservationResponse addNewReservation(ReservationResponse reservationResponse) {
        // You need to create a ReservationRequest class to handle incoming data
        

        try {
            // Example:
            Reservation newReservation = new Reservation();
            newReservation.setNbTicket(reservationResponse.getNbTicket());
            newReservation.setIdClient(reservationResponse.getClient().getIdClient());
            newReservation.setIdEvenet(reservationResponse.getEvent().getIdEvent());

            Reservation savedReservation = reservationRepository.save(newReservation);

            // You may need to handle the case where the client is not found based on the client_id
            Client client = findClientById(savedReservation.getIdClient());
            Event event = findEventById(savedReservation.getIdEvenet());

            return ReservationResponse.builder()
                    .idReservation(savedReservation.getIdReservation())
                    .client(client)
                    .event(event)
                    .build();
        } catch (HttpClientErrorException.NotFound e) {
            // Handle the case where the client is not found
            throw new NotFoundException("Client not found for the provided client_id");
        } catch (Exception e) {
            // Handle other exceptions or validation errors
            throw new ServiceException("Failed to add a new car", e);
        }
    }

    private Client findClientById(Long clientId) {
        try {
            return restTemplate.getForObject(GET_FURL + "/api/client/" + clientId, Client.class);
        } catch (HttpClientErrorException.NotFound e) {
            // Handle the case where the client is not found
            throw new NotFoundException("Client not found for the provided client_id");
        } catch (Exception e) {
            // Handle other exceptions
            throw new ServiceException("Error while fetching client information", e);
        }


    }
    private Event findEventById(Long eventId) {
        try {
            return restTemplate.getForObject(GET_SURL + "/api/event/" + eventId, Event.class);
        } catch (HttpClientErrorException.NotFound e) {
            // Handle the case where the client is not found
            throw new NotFoundException("Client not found for the provided event_id");
        } catch (Exception e) {
            // Handle other exceptions
            throw new ServiceException("Error while fetching event information", e);
        }


    }
    
    

    public boolean deleteReservation(Long id)
    {
        Optional<Reservation> reservation= reservationRepository.findById(id);

        if(reservation.isPresent())
        {
            reservationRepository.deleteById(id);
            return true;
        }
        return false;

    }

    public ReservationResponse editReservation(Reservation updatedReservation) {
        try {
            // Check if the reservation with the given ID exists
            Reservation existingReservation = reservationRepository.findById(updatedReservation.getIdReservation())
                    .orElseThrow(() -> new NotFoundException("Reservation not found for the provided id"));

            // Update the existing car entity with the new data
            existingReservation.setNbTicket(updatedReservation.getNbTicket());
            existingReservation.setIdEvenet(updatedReservation.getIdEvenet());
            existingReservation.setIdClient(updatedReservation.getIdClient()); // Assuming you have a getClientId() method in Reservation

            // Save the updated car entity
            Reservation savedReservation = reservationRepository.save(existingReservation);

            // Fetch the updated client information
            Client client = findClientById(savedReservation.getIdClient());
            Event event = findEventById(savedReservation.getIdEvenet());


            return ReservationResponse.builder()
                    .idReservation(savedReservation.getIdReservation())
                    .client(client)
                    .event(event)
                    .build();
        } catch (HttpClientErrorException.NotFound e) {
            // Handle the case where the client is not found
            throw new NotFoundException("Client or reservation not found for the provided client_id");
        } catch (Exception e) {
            // Handle other exceptions or validation errors
            throw new ServiceException("Failed to edit the reservation", e);
        }
    }

    
}
