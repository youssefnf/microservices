package ma.ticket.server;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig implements WebMvcConfigurer {

    public void addCorsMappings (CorsRegistry corsregistry) {
        corsregistry.addMapping("/**").
            allowedOrigins("http://localhost:4200").
            allowedMethods ("GET", "POST", "PUT", "DELETE");
    }



}

