## Overview

This is the backend for Floor It! It is responsible for automating and processing the
creation of categories. These categories are then aggregated to generate a list that
will be consumed by the frontend application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Development](#development)
4. [Testing](#testing)
5. [Code Formatting](#code-formatting)
6. [Pre-commit Hooks](#pre-commit-hooks)
7. [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.12 or higher
- Poetry (Dependency management tool)
- Make (for macOS/Linux users) or an equivalent setup for Windows

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/apnguyen1/floor-it.git
   cd floor-it/backend
   ```

2. Install Poetry Follow the official Poetry installation guide for your OS:
   https://python-poetry.org/docs/#installation.

   After installation, verify it by running: ```poetry --version```

3. Set up a virtual environment and install dependencies

   For macOS/Linux users:

   ```bash
   poetry env use python3
   eval $(poetry env activate)
   ```

   For Windows users (PowerShell):

   ```powershell
   poetry env use python
   Invoke-Expression (poetry env activate)
   ```

4. installing dependencies:

   ```bash
   poetry install
   ```

5. Verify setup

   ```
   poetry run python --version # should be 3.12
   make all
   ```

## Development

### Folder Structure

```
src/
├── models/         # Data models (DTOs)
├── resources/      # Static and output files
├── scripts/        # Data processing scripts
├── utils/          # Reusable utility functions
└── main.py         # Entry point of the application
tests/              # Unit tests
```

#### Entry Point

The backend application starts from src/main.py. This script is responsible for
initializing the backend processes.

To run the application locally:

```
make run
```

## Testing

This project uses pytest for unit testing.

### Run Tests

```bash
make test
```

## Code Formatting

This project uses black for code formatting.

### Format Code

```bash
make format
```

## Pre-commit Hooks

This project uses pre-commit hooks.

### Pre-commit Checks

- Code is automatically linted using flake8
- Code is automatically formatted using black

To manually run pre-commit hooks:

```
poetry run pre-commit run --all-files
```
