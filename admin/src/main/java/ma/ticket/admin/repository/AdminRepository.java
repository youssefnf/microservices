package ma.ticket.admin.repository;

import ma.ticket.admin.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer> {

    Optional<Admin> findByUsernameAndMdp(String username, String mdp);
}
