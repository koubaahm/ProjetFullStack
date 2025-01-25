# Utiliser une image Java légère
FROM eclipse-temurin:17-jdk

# Définir l'argument pour le fichier WAR
ARG WAR_FILE=target/gestionCategorie-0.0.1-SNAPSHOT.war

# Copier le WAR dans le conteneur
COPY ${WAR_FILE} app.war

# Exposer le port de l'application
EXPOSE 8085

# Lancer l'application avec le fichier WAR
ENTRYPOINT ["java", "-jar", "/app.war"]