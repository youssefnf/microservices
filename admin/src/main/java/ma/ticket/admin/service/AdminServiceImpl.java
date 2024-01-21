package ma.ticket.admin.service;

import ma.ticket.admin.entity.Admin;
import ma.ticket.admin.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminRepository adminRepository;
    @Override
    public Admin ajouterAdmin(Admin a) {
        return adminRepository.save(a);
    }

    @Override
    public List<Admin> getAdmin() {
        return adminRepository.findAll();
    }

    @Override
    public void modifierAdmin(Admin v) {

        Optional<Admin> r= adminRepository.findById(v.getIdAdmin());

        if(r.isPresent())
        {
            Admin c= r.get();

            c.setUsername(v.getUsername());
            c.setMdp(v.getMdp());
            adminRepository.save(c);

        }
    }

    @Override
    public void supprimerAdmin(int id) {
        adminRepository.deleteById(id);
    }

    @Override
    public boolean existAdmin(String username, String mdp) {
        Optional<Admin> adminOptional = adminRepository.findByUsernameAndMdp(username, mdp);
        return adminOptional.isPresent();
    }
}
