FROM eclipse-temurin:17-jre

WORKDIR /app

# =========================
# minimal stable deps
# =========================
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    tini \
    procps \
 && rm -rf /var/lib/apt/lists/*

# =========================
# version pin (安定の最重要要素)
# =========================
ARG LAVALINK_VERSION=4.0.8

RUN curl -fsSL --retry 3 --retry-delay 2 \
 -o Lavalink.jar \
https://github.com/lavalink-devs/Lavalink/releases/download/${LAVALINK_VERSION}/Lavalink.jar

# =========================
# directories
# =========================
RUN mkdir -p /app/logs /app/data /app/plugins

# =========================
# user isolation
# =========================
RUN useradd -m lavalink \
 && chown -R lavalink:lavalink /app

USER lavalink

# =========================
# port
# =========================
EXPOSE 2333

# =========================
# JVM stability tuning (重要)
# =========================
ENV JAVA_OPTS="\
-Xms2G \
-Xmx3G \
-XX:+UseG1GC \
-XX:MaxGCPauseMillis=120 \
-XX:+ParallelRefProcEnabled \
-XX:+UseStringDeduplication \
-XX:+DisableExplicitGC \
-XX:+ExitOnOutOfMemoryError \
-XX:+HeapDumpOnOutOfMemoryError \
-XX:HeapDumpPath=/app/logs \
-XX:+AlwaysPreTouch \
-Djava.awt.headless=true \
-Dfile.encoding=UTF-8"

# =========================
# healthcheck (重要)
# =========================
HEALTHCHECK --interval=20s --timeout=5s --retries=5 --start-period=20s \
CMD curl -fsS http://localhost:2333/v4/info || exit 1

# =========================
# signal handling
# =========================
STOPSIGNAL SIGTERM

# =========================
# tini (必須級安定化)
# =========================
ENTRYPOINT ["/usr/bin/tini", "--"]

# =========================
# start
# =========================
CMD ["sh", "-c", "exec java $JAVA_OPTS -jar Lavalink.jar"]
