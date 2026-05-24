FROM eclipse-temurin:17-jre

WORKDIR /app

# =========================
# 必要最低限のみインストール
# =========================
RUN apt-get update \
 && apt-get install -y curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# =========================
# Lavalink version固定（重要）
# =========================
ARG LAVALINK_VERSION=4.0.8
RUN curl -L -o Lavalink.jar \
https://github.com/lavalink-devs/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar

# =========================
# config
# =========================
COPY application.yml /app/application.yml

# =========================
# non-root user（重要）
# =========================
RUN useradd -m lavalink
USER lavalink

# =========================
# port
# =========================
EXPOSE 2333

# =========================
# JVM tuning（安定版）
# =========================
ENV JAVA_OPTS="-Xms512m -Xmx2G -XX:+UseG1GC"

CMD ["sh", "-c", "java $JAVA_OPTS -jar Lavalink.jar"]