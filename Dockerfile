FROM eclipse-temurin:17-jre

WORKDIR /app

COPY Lavalink.jar .

EXPOSE 2333

CMD ["java", "-jar", "Lavalink.jar"]
