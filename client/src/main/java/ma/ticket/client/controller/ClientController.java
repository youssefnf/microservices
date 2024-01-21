package ma.ticket.client.controller;

import ma.ticket.client.entity.Client;
import ma.ticket.client.service.ClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientServiceImpl clientService;
    // Endpoint pour ajouter un client
    @PostMapping
    public ResponseEntity<Client> addClient(@RequestBody Client client) {
        Client newClient = clientService.ajouterClient(client);
        return new ResponseEntity<>(newClient, HttpStatus.CREATED);
    }


    @GetMapping("/list")
    public List<Client> getAllClients() {
        return clientService.getClient();
    }

    // Endpoint pour supprimer un client par ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long userId) {
        clientService.supprimerClient(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{userId}")
    public Client findClt(@PathVariable Long userId) {

        return clientService.findClient(userId)  ;  }

    @GetMapping("/{pagenumber}/{pagesize}")
    public Page<Client> eventsPages(@PathVariable int pagenumber, @PathVariable int pagesize)
    {
        return clientService.allClientPaginations(pagenumber, pagesize);

    }

    @PutMapping
    public ResponseEntity<Client> modifierClient(@RequestBody Client client)
    {
        Client modifierClient = clientService.modifierClient(client);
        if (modifierClient != null)
        {
            return ResponseEntity.ok(modifierClient);
        }
        else
            return ResponseEntity.notFound().build();
    }

}
