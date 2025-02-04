.PHONY: all test lint format clean

all: test lint format

test:
		pytest

lint:
		flake8 .

format:
		black .

clean:
		rm -rf .pytest_cache
		rm -rf build
		rm -rf dist
		rm -rf *.egg-info