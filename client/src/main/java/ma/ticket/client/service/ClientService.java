package ma.ticket.client.service;

import ma.ticket.client.entity.Client;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ClientService {
    public Client ajouterClient(Client a);

    List<Client> getClient();

    Client  modifierClient(Client v);

    public void supprimerClient(Long id);

    public Client findClient(Long id);

    public Page<Client> allClientPaginations(int pagenumber, int pagesize  );


    
}
