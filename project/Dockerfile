FROM eclipse-temurin:17-jre

WORKDIR /app

RUN apt-get update && apt-get install -y curl ca-certificates dumb-init \
 && rm -rf /var/lib/apt/lists/*

ARG LAVALINK_VERSION=4.0.8

RUN curl -L -o Lavalink.jar \
https://github.com/lavalink-devs/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar

COPY application.yml /app/application.yml

EXPOSE 8080

CMD ["java","-jar","Lavalink.jar","--spring.config.location=file:/app/application.yml"]
