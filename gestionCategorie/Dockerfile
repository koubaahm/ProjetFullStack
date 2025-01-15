# Utiliser une image Java légère
FROM openjdk:17-jdk-alpine

# Définir l'argument pour le fichier WAR
ARG WAR_FILE=target/gestionCategorie-0.0.1-SNAPSHOT.war

# Copier le WAR dans le conteneur
COPY ${WAR_FILE} app.war

# Exposer le port de l'application
EXPOSE 8084

# Lancer l'application avec le fichier WAR
ENTRYPOINT ["java", "-jar", "/app.war"]
FROM ubuntu:latest
LABEL authors="Ahmed"

ENTRYPOINT ["top", "-b"]