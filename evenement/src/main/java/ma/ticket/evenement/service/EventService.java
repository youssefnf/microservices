package ma.ticket.evenement.service;

import ma.ticket.evenement.entity.Event;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EventService {
    public Event ajouterEvent(Event event);

    public Event modifierEvent(Event event);

    public boolean supprimerEvent(Long id);

    public List<Event> listEvent();
    public Page<Event> allEventsPaginations(int pagenumber, int pagesize  );

    public  Event findEvent(Long id);

}
