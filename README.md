## Overview

This is the backend for Floor It! It is built with Python and will be used to primary process local file and occasional 
API JSON  to create categories for our application!


## Frontend

You can find our frontend repo linked [here!](https://github.com/apnguyen1/react-floor-it)

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

- Python (v3.9 or higher)
- Git

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/floor-it.git
   cd floor-it
   ```

2. Activate venv environment

   ```bash
   eval $(poetry env activate)
   ```
   ```powershell
   Invoke-Expression (poetry env activate)
   ```

3. installing dependencies:
   ```bash
   poetry install
   ```

## Development

### Folder Structure

```
src/
├── resources/      # static and output files
├── scripts/        # Processing of data
├── utils/          # Reusable utility functions
└── main.py         # Entry point
```

### Run the data caching

```bash
python -m src.main
```

## Testing

This project uses pytest for unit testing.

### Run Tests

```bash
npm run tests
```

## Code Formatting

This project uses black for code formatting.

### Format Code

```bash
npm run format
```

## Pre-commit Hooks

This project uses pre-commit hooks.

### Pre-commit Checks

- Code is automatically linted using flake8
- Tests are run to ensure no regressions are introduced


```bash
npm run prepare
```

## Contributing

We welcome contributions! Please follow these steps:

1. Clone the repository
2. Create a new branch for your feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your commit message"
   ```

4. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request and describe your changes