FROM openjdk:17
WORKDIR /App
VOLUME /tmp
COPY /target/client-0.0.1-SNAPSHOT.jar .


ENTRYPOINT ["java", "-jar" , "client-0.0.1-SNAPSHOT.jar"]