.PHONY: all

all: test format lint clean

ci: test lint format-check

test:
		PYTHONPATH=.. python -m pytest

lint:
		flake8 .

format:
		black .

format-check:
		black --check .

clean:
		rm -rf .pytest_cache
		rm -rf build
		rm -rf dist
		rm -rf *.egg-info
