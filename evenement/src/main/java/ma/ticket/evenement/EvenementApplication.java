package ma.ticket.evenement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:4200")
@EnableDiscoveryClient
@SpringBootApplication
public class EvenementApplication {

	public static void main(String[] args) {
		SpringApplication.run(EvenementApplication.class, args);
	}

}
