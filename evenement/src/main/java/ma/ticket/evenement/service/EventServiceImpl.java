package ma.ticket.evenement.service;

import ma.ticket.evenement.entity.Event;
import ma.ticket.evenement.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    EventRepository eventRepository;

    @Override
    public Event ajouterEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event modifierEvent(Event event) {
        Optional<Event> resultat= eventRepository.findById(event.getIdEvent());
        if (resultat.isPresent())
        {
            Event event1 = resultat.get();
            event1.setNom(event.getNom());
            event1.setLieu(event.getLieu());
            event1.setDate(event.getDate());
            event1.setDescription(event.getDescription());
            event1.setNbTicket(event.getNbTicket());
            event1.setPrix(event.getPrix());
            event1.setType(event.getType());
            System.out.println("weeb hook test");
            System.out.println("weeb hook test ");
            System.out.println("hook test");


            return eventRepository.save(event1);
        }

        return null;
    }

    @Override
    public boolean supprimerEvent(Long id) {
        Optional<Event> resultat= eventRepository.findById(id);
        if (resultat.isPresent())
        {
            eventRepository.deleteById(id);
            return true;
        }

        return false;
    }

    @Override
    public List<Event> listEvent() {
        return eventRepository.findAll();
    }

    @Override
    public Page<Event> allEventsPaginations(int pagenumber, int pagesize) {
        Pageable pageable = PageRequest.of(pagenumber, pagesize);
        return eventRepository.findAll(pageable);
    }

    @Override
    public Event findEvent(Long id) {
        return eventRepository.findById(id).get();
    }
}
