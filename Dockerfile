FROM eclipse-temurin:17-jre

WORKDIR /app

RUN apt-get update && apt-get install -y curl \
 && curl -L -o Lavalink.jar https://github.com/lavalink-devs/Lavalink/releases/latest/download/Lavalink.jar

EXPOSE 2333

CMD ["java", "-jar", "Lavalink.jar"]
