## Overview

Floor It! is a web-based trivia game designed to bring competitive 1v1 duels to life.
By blending speed, strategy, and knowledge, the game provides a dynamic experience where
players can challenge their friends in head-to-head trivia battles. Floor It! is
designed to be accessible, fun, and socially engaging, catering to trivia enthusiasts
and casual gamers alike.

## Contributing

We welcome contributions! Please follow these steps:

1. Clone the repository
2. Create a new branch for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes

4. Commit your changes:

   ```bash
   git commit -m "Add your commit message"
   ```

6. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

7. Open a pull request and describe your changes

## Beta Release

### Building + Testing

#### Frontend

1. Cd into the frontend directory `cd frontend`
2. Install the project's dependencies `npm install`
3. To test the application run `npm run test`

#### Backend

1. cd into the backend directory `cd backend`
2. Install python 3.12 and poetry into your machine
3. Install the project's dependencies with `poetry install`
4. To test the application run `make test`

### Running

Our application runs on the frontend, to get started:

1. Cd into the frontend directory `cd frontend`
2. Install the project's dependencies `npm install`
3. Run the command `npm run dev`
4. You should find the webpage running locally at [https://localhost:5173]

### Operational Use Cases

- Category selection (players are able to select from \[limited\] categories).
- Players answering questions in their selected trivia category (interaction between
  player and system's timer and web speech API).
