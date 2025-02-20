# Frontend README

## Overview

This is the frontend for Floor It! It is built using React and utilizes the Web Speech
Recognition API for speech-to-text functionality.

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

- Node.js (v22.2.0 or higher)
- npm (v8 or higher)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/apnguyen1/floor-it.git
   cd floor-it/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Development

### Folder Structure

```
src/
├── components/      # Reusable UI components
├── constants/       # reusable or named constants
├── context/         # custom contexts
├── hooks/           # custom React hooks
├── screens/         # app UI screens
├── styles/          # app style
├── types/           # custom types
├── utils/           # Utility functions
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

## Testing

This project uses Vitest for unit testing.

### Run Tests

```bash
npm run test
```

Tests are expected for every utility function and component. To identity a file's
corresponding test, it'll be it's original file name followed by `.test.<file_ext>`

For example

```
fetch.ts
fetch.test.ts
||
Home.tsx
Home.test.ts
```

For consistency, use the existing written tests for styling guidelines to write tests

## Code Formatting

This project uses Prettier for code formatting.

### Format Code

```bash
npm run format
```

## Pre-commit Hooks

This project uses Husky to enforce pre-commit hooks.

### Pre-commit Checks

- Code is automatically formatted using Prettier
- Tests are run to ensure no regressions are introduced