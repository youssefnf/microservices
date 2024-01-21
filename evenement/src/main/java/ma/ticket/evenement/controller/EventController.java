package ma.ticket.evenement.controller;


import ma.ticket.evenement.entity.Event;
import ma.ticket.evenement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/ajouter")
    public ResponseEntity<Event> ajouterEvent(@RequestBody Event event)
    {
        Event enregistrerEvent = eventService.ajouterEvent(event);
        return ResponseEntity.ok(enregistrerEvent);
    }

    @PutMapping("/modifier")
    public ResponseEntity<Event> modifierEvent(@RequestBody Event event)
    {
        Event enregistrerEvent = eventService.modifierEvent(event);
        if (enregistrerEvent != null)
        {
            return ResponseEntity.ok(enregistrerEvent);
        }
        else
            return ResponseEntity.notFound().build();
    }
    @RequestMapping(value = "/supprimer/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> supprimerEvent(@PathVariable("id") Long id)
    {
        boolean event = eventService.supprimerEvent(id);
        if (event)
        {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/all/{pagenumber}/{pagesize}")
    public Page<Event> eventsPages(@PathVariable int pagenumber, @PathVariable int pagesize)
    {
        return eventService.allEventsPaginations(pagenumber, pagesize);

    }

    @GetMapping
    public List<Event> eventsList()
    {
        return eventService.listEvent();

    }

    @GetMapping("/{id}")
    public  Event findEvt(@PathVariable("id") Long id)
    {
        return eventService.findEvent(id);
    }

}
