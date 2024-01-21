FROM openjdk:17
WORKDIR /App
VOLUME /tmp
COPY /target/admin-0.0.1-SNAPSHOT.jar .


ENTRYPOINT ["java", "-jar" , "admin-0.0.1-SNAPSHOT.jar"]