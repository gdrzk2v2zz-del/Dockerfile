FROM eclipse-temurin:17-jre

WORKDIR /app

=========================

packages

=========================

RUN apt-get update && apt-get install -y 
curl 
ca-certificates 
dumb-init 
&& rm -rf /var/lib/apt/lists/*

=========================

Lavalink version pinning

=========================

ARG LAVALINK_VERSION=4.0.8

RUN curl -L -o Lavalink.jar 
https://github.com/lavalink-devs/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar

=========================

config

=========================

COPY application.yml /app/application.yml
COPY plugins /app/plugins

=========================

logs/temp

=========================

RUN mkdir -p /app/logs /app/temp

=========================

non-root

=========================

RUN useradd -m lavalink 
&& chown -R lavalink:lavalink /app

USER lavalink

=========================

JVM tuning

=========================

ENV JAVA_OPTS=”-Xms512m -Xmx2G -XX:+UseG1GC”

EXPOSE 2333

ENTRYPOINT [”/usr/bin/dumb-init”, “–”]

CMD [“sh”, “-c”, “java $JAVA_OPTS -jar Lavalink.jar”]
