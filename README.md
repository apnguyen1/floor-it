# Floor It!

Floor It! is a web-based trivia game that brings competitive 1v1 duels to life. Inspired by elements of popular trivia games, it challenges players to outsmart their opponents in head-to-head battles of knowledge. The app is designed to be accessible, fun, and socially engaging, offering trivia enthusiasts an opportunity to challenge their friends from the comfort of their own homes.

---
## Goals

To create an engaging, scalable web-based trivia game targeted at trivia enthusiasts and casual gamers who enjoy competitive, head-to-head duels. Floor It! emphasizes quick thinking, adaptability, and a fast-paced, turn-based trivia experience.

---
## Features
- **Competitive Trivia Gameplay**: Players compete head-to-head with turn-based mechanics and individual timers.
- **Dynamic Categories**: Interactive categories allow for varied and engaging trivia questions.
- **Local Multiplayer**: Play with friends or family in the comfort of your home.

---
## Technical Approach
- **Frontend**: Built using ReactJS to deliver a dynamic and responsive user experience.
- **Backend**: Developed with Spring Boot to handle API endpoints for managing matches, player data, and question pools.
- **Database**: A relational database (e.g., MySQL) to store trivia questions, player data, and match records.

The front-end repo can be found [here](https://github.com/phuongp02/react-floor-it)

---
## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Running the Project (Spring Application)](#running-the-backend-spring-application)
---

## Prerequisites
Before running the application, ensure you have the following installed:
- **Java 17** or higher
- **Gradle 8.0** or higher
---

## Running the Backend (Spring Application)

### Steps to Run:
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/floor-it.git
    cd floor-it
    ```

2. Build the backend:
    ```bash
    mvn clean install
    ```

3. Run the application:
    ```bash
    mvn spring-boot:run
    ```

4. The backend will start at `http://localhost:8080`.

---
## Contributing
We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request. Ensure code changes are thoroughly tested.

---
## License
This project is licensed under the [MIT License](LICENSE).
