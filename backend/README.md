## Overview

This is the backend for Floor It! It is built with Python and will be used to primary
process local file and occasional API JSON to create categories for our application!

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

- Python (v3.12 or higher)
- Poetry

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/apnguyen1/floor-it.git
   cd floor-it
   ```

2. Follow instructions to install Poetry on your OS. After verify your installation
   by:

```
poetry --verison
```

3. Create and activate virtual environment in poetry

```bash
(mac)
poetry env use python3
eval $(poetry env activate)
```

```powershell
(windows)
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
poetry run python -m pytest
```

## Development

### Folder Structure

```
src/
├── models/         # DTOs
├── resources/      # static and output files
├── scripts/        # Processing of data
├── utils/          # Reusable utility functions
└── main.py         # Entry point
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
- Tests are run to ensure no regressions are introduced
