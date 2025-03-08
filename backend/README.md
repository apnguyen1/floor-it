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

   After installation, verify it by running: `poetry --version`

3. Set up a virtual environment and install dependencies

   For macOS/Linux users:

   ```bash
   poetry env use python3
   poetry shell  # Activates the virtual environment
   ```

   For Windows users (PowerShell):

   ```powershell
   poetry env use python
   poetry shell  # Activates the virtual environment
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

### Entry Point

The backend application starts from src/main.py. This script is responsible for
initializing the backend processes.

To run the application locally:

```
make run
```

### Adding New Categories

1. Create a new script in the `src/scripts` directory
2. Implement the `Category` interface from `src/utils/category.py`
3. Add your new category to the `CATEGORIES` list in `src/main.py`

## Testing

This project uses pytest for unit testing.

### Run Tests

```bash
make test
```

### Writing Tests

Tests should be organized to mirror the structure of the `src` directory. For each
module you want to test:

1. Create a corresponding test file in the `tests` directory with the naming convention
   `module_name_test.py`.
2. Use pytest fixtures for test setup and teardown.
3. Use mocking with `unittest.mock` or `pytest-mock` for external dependencies.

#### Test File Structure

```python
import pytest
from unittest.mock import patch, MagicMock

from backend.src.module_path import TargetClass

@pytest.fixture
def setup_fixture():
    # Setup code that runs before each test
    return test_data

def test_specific_function(setup_fixture):
    # Arrange
    instance = TargetClass()

    # Act
    result = instance.method_under_test()

    # Assert
    assert result == expected_value

@patch('backend.src.module_path.external_dependency')
def test_with_mocking(mock_dependency, setup_fixture):
    # Configure the mock
    mock_dependency.return_value = mocked_result

    # Arrange
    instance = TargetClass()

    # Act
    result = instance.method_using_dependency()

    # Assert
    assert result == expected_value
    mock_dependency.assert_called_once_with(expected_args)
```

#### Testing DTO Models

When testing DTO models, focus on serialization/deserialization and validation:

```python
def test_dto_serialization():
    # Create a DTO instance
    dto = ExampleDTO(field1="value1", field2=123)

    # Test serialization
    serialized = dto.model_dump()
    assert serialized == {"field1": "value1", "field2": 123}

    # Test deserialization
    deserialized = ExampleDTO.model_validate(serialized)
    assert deserialized == dto
```

#### Running Specific Tests

To run a specific test file:

```bash
poetry run pytest tests/path/to/test_file.py -v
```

To run a specific test function:

```bash
poetry run pytest tests/path/to/test_file.py::test_function_name -v
```

## Code Formatting

This project uses black for code formatting and isort for import sorting.

### Format Code

```bash
make format
```

### Check Formatting Without Modifying

```bash
make lint
```

## Pre-commit Hooks

This project uses pre-commit hooks to ensure code quality and consistency.

### Installed Hooks

- `black` - Code formatter
- `isort` - Import sorter
- `flake8` - Linter
- `mypy` - Static type checker
- `pytest` - Test runner

### Pre-commit Checks

- Code is automatically linted using flake8
- Code is automatically formatted using black
- Imports are sorted using isort
- Type hints are checked using mypy
- Tests are run to ensure no regressions

To manually run pre-commit hooks:

```bash
poetry run pre-commit run --all-files
```

To install the pre-commit hooks:

```bash
poetry run pre-commit install
```

## Building for Production

To prepare the backend for production deployment:

1. Ensure all tests pass

   ```bash
   make test
   ```

2. Generate categories and output files

   ```bash
   make run
   ```

3. Verify the output files are correctly generated in `src/resources/output`

4. Copy the output files to the frontend's public directory
   ```bash
   cp src/resources/output/* ../frontend/public/
   ```

## Troubleshooting

### Common Issues

1. **Poetry not found**: Ensure Poetry is installed and added to your PATH
2. **Module not found errors**: Make sure you're running commands from the project root
   and using the correct Python environment
3. **Permission issues with make**: Ensure you have the necessary permissions to execute
   make commands

### Debug Logging

To enable debug logging, set the environment variable:

```bash
export DEBUG=1
```

Then run the application:

```bash
make run
```
