package ma.ticket.reservation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@SpringBootApplication
@EnableDiscoveryClient
public class ReservationApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservationApplication.class, args);
	}

	@Bean
	public RestTemplate restTemplate(){
		RestTemplate restTemplate = new RestTemplate();
		SimpleClientHttpRequestFactory requestFactory=new SimpleClientHttpRequestFactory();
		requestFactory.setConnectTimeout(5000);
		restTemplate.setRequestFactory(requestFactory);
		return  restTemplate;
	}


}
