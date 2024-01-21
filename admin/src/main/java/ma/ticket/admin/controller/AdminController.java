package ma.ticket.admin.controller;

import ma.ticket.admin.entity.Admin;
import ma.ticket.admin.service.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private AdminServiceImpl adminService;
    // Endpoint pour ajouter un admin
    @PostMapping
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
        Admin newAdmin = adminService.ajouterAdmin(admin);
        return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
    }


    @GetMapping
    public List<Admin> getAllAdmins() {
        return adminService.getAdmin();
    }

    // Endpoint pour supprimer un admin par ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable int userId) {
        adminService.supprimerAdmin(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/exist/{username}/{mdp}")
    public ResponseEntity<Boolean> existAdmin(@PathVariable String username, @PathVariable String mdp) {
        boolean exists = adminService.existAdmin(username, mdp);
        return new ResponseEntity<>(exists, HttpStatus.OK);
    }
}
