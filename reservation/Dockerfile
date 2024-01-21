FROM openjdk:17
WORKDIR /App
VOLUME /tmp
COPY /target/reservation-0.0.1-SNAPSHOT.jar .


ENTRYPOINT ["java", "-jar" , "reservation-0.0.1-SNAPSHOT.jar"]