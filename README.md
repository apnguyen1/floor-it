# Floor It!

## Overview

Floor It! is a web-based trivia game designed to bring competitive 1v1 duels to life. By
blending speed, strategy, and knowledge, the game provides a dynamic experience where
players can challenge their friends in head-to-head trivia battles. Floor It! is
designed to be accessible, fun, and socially engaging, catering to trivia enthusiasts
and casual gamers alike.

## User Manual

### Installation

#### Prerequisites

- Node.js (version 18 or later)
- Python 3.12
- Poetry (for managing Python dependencies)

#### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/apnguyen1/floor-it.git
   cd Floor-it
   ```
2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend
   poetry install
   ```

### Running the Application

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the frontend server:
   ```bash
   npm run dev
   ```
3. The application should be available locally
   at [http://localhost:5173](http://localhost:5173)

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the processing script:
   ```bash
    PYTHONPATH=.. poetry run python -m src.main
   ```

### Usage Guide

- **Category Selection**: Players can select from a list of trivia categories.
- **Answering Questions**: Players answer questions in their selected category,
  interacting with the system’s timer and Web Speech API.
- **Scoring System**: Players accumulate points based on correct answers and speed.
- **Competitive Mode**: Players can challenge friends in 1v1 trivia battles.

### Reporting Bugs

To report a bug:

1. Navigate to the GitHub Issues
   page: [here](https://github.com/apnguyen1/floor-it/issues)
2. Create a new issue and include:
    - A description of the bug
    - Steps to reproduce the issue
    - Expected vs actual behavior
    - Screenshots (if applicable)
    - System environment details (browser, OS, etc.)

### Known Bugs

Any known issues or limitations are tracked in
the [Issue Tracker](https://github.com/apnguyen1/floor-it/issues).

## Developer Guide

### Contributing

We welcome contributions! Please follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/apnguyen1/floor-it.git
   ```
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```
5. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a pull request and describe your changes

### Repository Structure

```
floor-it/
│-- frontend/      # Frontend source code
│-- backend/       # Backend source code
```

### Building + Testing

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm run test
   ```

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run tests:
   ```bash
   make test
   ```

### Building a Release

1. Ensure all tests pass before proceeding:
   ```bash
   npm run test
   make test
   ```
2. Update the version number in the `package.json` (frontend) and `pyproject.toml` (
   backend) files.
3. Create a Git tag for the release:
   ```bash
   git tag -a v1.0 -m "Release v1.0"
   git push origin v1.0
   ```

### Beta++ Release

**Version:** v1.1.0