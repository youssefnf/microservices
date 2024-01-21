package ma.ticket.admin.service;

import ma.ticket.admin.entity.Admin;

import java.util.List;

public interface AdminService {
    public Admin ajouterAdmin(Admin a);

    List<Admin> getAdmin();

    void  modifierAdmin(Admin v);

    public void supprimerAdmin(int id);

    public boolean existAdmin(String email , String mdp);
}
