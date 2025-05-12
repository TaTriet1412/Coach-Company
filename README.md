# Coach-Company

## Overview

Coach-Company is a comprehensive web application for managing a coach (bus) transportation business. It includes features for managing routes, buses, trips, ticket bookings, user accounts, news, and customer contact. The application is built with a Spring Boot backend, an Angular frontend, and a MySQL database.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Docker**: To run the MySQL database instance. (Download [Docker](https://www.docker.com/products/docker-desktop/))
*   **Node.js and npm**: For the Angular frontend. (Download [Node.js](https://nodejs.org/))
*   **Angular CLI**: `npm install -g @angular/cli`
*   **Java Development Kit (JDK)**: Version 11 or higher for the Spring Boot backend. (e.g., [OpenJDK](https://adoptium.net/))
*   **Apache Maven**: For building and running the Spring Boot backend. (Download [Maven](https://maven.apache.org/download.cgi))
    *   Alternatively, if the project uses a Maven wrapper (`mvnw`), you might not need a global Maven installation.

## Project Structure (Assumed)

This project is divided into two main parts: a Spring Boot backend and an Angular frontend.

**Backend (Spring Boot) - Example Structure:**
```
coach-company/<br>
├── backend/<br>
│   ├── src/<br>
│   │   ├── main/<br>
│   │   │   ├── java/<br>
│   │   │   │   └── com/<br>
│   │   │   │       └── example/<br>
│   │   │   │           └── main/<br>
│   │   │   │               ├── CoachCompanyApplication.java  # Main Spring Boot application class<br>
│   │   │   │               ├── config/                       # Configuration classes<br>
│   │   │   │               ├── controller/                   # REST controllers<br>
│   │   │   │               ├── model/                        # Entity classes<br>
│   │   │   │               ├── repository/                   # Repository interfaces<br>
│   │   │   │               └── service/                      # Service classes<br>
│   │   └── resources/                                     # Resources (e.g., application.properties)<br>
│   │   └── test/                                              # Test source files<br>
│   ├── target/                                                # Compiled bytecode and other build outputs<br>
│   ├── pom.xml                                                # Maven configuration file<br>
│   └── mvnw                                                   # Maven wrapper script<br>
```

**Frontend (Angular) - Example Structure:**
```
coach-company/<br>
├── frontend/<br>
│   ├── src/<br>
│   │   ├── app/<br>
│   │   │   ├── components/                                    # Angular components<br>
│   │   │   ├── services/                                      # Angular services<br>
│   │   │   ├── models/                                        # TypeScript models<br>
│   │   │   ├── app-routing.module.ts                          # Routing module<br>
│   │   │   ├── app.component.html                             # Main component template<br>
│   │   │   ├── app.component.ts                               # Main component TypeScript file<br>
│   │   │   └── app.module.ts                                  # Main module<br>
│   │   ├── assets/                                            # Static assets (e.g., images, styles)<br>
│   │   └── environments/                                      # Environment-specific configuration<br>
│   ├── angular.json                                           # Angular CLI configuration file<br>
│   └── package.json                                           # Node.js dependencies and scripts<br>
```

## Setup and Run

### Database

1.  **Run MySQL using Docker**:
    ```sh
    docker-compose up -d
    ```

2.  **Import the `coachcompany.sql` schema**:
    ```sh
    docker exec -i <mysql-container-name> mysql -u <username> -p<password> < database < coachcompany.sql
    ```

### Backend

1.  **Navigate to the backend directory**:
    ```sh
    cd backend
    ```

2.  **Build and run the Spring Boot application**:

    *   **Option 1: Using Maven Spring Boot plugin (for development)**:
        ```sh
        ./mvnw spring-boot:run
        ```
        Or if you have Maven globally installed and no wrapper:
        ```sh
        mvn spring-boot:run
        ```

    *   **Option 2: Packaging as a JAR and running (for production-like execution)**:
        First, package the application:
        ```sh
        ./mvnw clean package
        ```
        Or if you have Maven globally installed and no wrapper:
        ```sh
        mvn clean package
        ```
        Then, run the JAR file (the exact JAR filename might vary based on your `pom.xml`):
        ```sh
        java -jar target/your-application-name-0.0.1-SNAPSHOT.jar
        ```
        (Replace `your-application-name-0.0.1-SNAPSHOT.jar` with the actual name of the generated JAR file in the `target` directory).

### Frontend

1.  **Navigate to the frontend directory**:
    ```sh
    cd frontend
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Run the Angular application**:

    *   **Option 1: Using Angular CLI serve command**:
        ```sh
        ng serve
        ```
        To open it directly in your browser:
        ```sh
        ng serve --open
        ```

    *   **Option 2: Using npm start script (if configured in `package.json`)**:
        Many Angular projects have `npm start` aliased to `ng serve` in their `package.json` scripts section.
        ```sh
        npm start
        ```

## Technologies Used

*   **Spring Boot**: Backend framework.
*   **Angular**: Frontend framework.
*   **MySQL**: Database.
*   **Docker**: Containerization.
*   **Maven**: Build tool for the backend.
*   **Node.js and npm**: JavaScript runtime and package manager for the frontend.
