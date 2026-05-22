FROM eclipse-temurin:17-jre

WORKDIR /app

RUN apt-get update && apt-get install -y curl

RUN curl -L -o Lavalink.jar \
https://github.com/lavalink-devs/Lavalink/releases/latest/download/Lavalink.jar

COPY application.yml /app/application.yml

EXPOSE 8080

CMD ["java", "-Xmx1G", "-jar", "Lavalink.jar"]
