# Stage 1: build
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -q -B dependency:go-offline

COPY src ./src
RUN mvn -q -B package -DskipTests

# Stage 2: runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar
# copia il file dati se necessario
COPY src/main/resources/data /data

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
