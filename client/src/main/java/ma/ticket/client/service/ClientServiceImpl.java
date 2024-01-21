package ma.ticket.client.service;

import com.netflix.discovery.converters.Auto;
import ma.ticket.client.entity.Client;
import ma.ticket.client.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;
    @Override
    public Client ajouterClient(Client a) {
        return clientRepository.save(a);
    }

    @Override
    public List<Client> getClient() {
        return clientRepository.findAll();
    }

    @Override
    public Client modifierClient(Client v) {
        Optional<Client> r= clientRepository.findById(v.getIdClient());

        if(r.isPresent())
        {
            Client c= r.get();

            c.setEmail(v.getEmail());
            c.setNom(v.getNom());
            c.setPrenom(v.getPrenom());
            c.setTel(v.getTel());
             return clientRepository.save(c);

        }
        return null;
    }

    @Override
    public void supprimerClient(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public Client findClient(Long id) {
        return clientRepository.findById(id).get();
    }

    @Override
    public Page<Client> allClientPaginations(int pagenumber, int pagesize) {
        Pageable pageable = PageRequest.of(pagenumber, pagesize);
        return clientRepository.findAll(pageable);
    }


}
