# Frontend README

## Overview

This is the frontend for Floor It! It is built using React and utilizes the Web Speech
Recognition API for speech-to-text functionality. The frontend communicates with a
backend server via REST APIs.

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
   git clone https://github.com/your-username/react-floor-it.git
   cd react-floor-it
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
├── hooks/           # Custom React hooks
├── services/        # API and WebSocket services
├── utils/           # Utility functions
├── App.tsx          # Main application component
└── main.tsx         # Entry point
```

### Run the Development Server

```bash
npm run dev
```

## Testing

This project uses Vitest for unit testing.

### Run Tests

```bash
npm run test
```

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

### Install Husky Hooks

```bash
npm run prepare
```
