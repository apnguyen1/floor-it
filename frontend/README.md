# Frontend README

## Overview

This is the frontend for Floor It! It is built using React and utilizes the Web Speech
Recognition API for speech-to-text functionality.

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

## Contributing

Feel free to contribute to the project-- Below are details providing clarity to
contribute according to the repository styling and structure guidelines

## Development

### Folder Structure

```
src/
├── constants/                # Reusable or named constants
├── context/                  # Custom React contexts
├── hooks/                    # Custom React hooks
├── screens/                  # Application UI screens
│  ├── components/              # Screen UI components
│  │   ├── Button/
│  │   │   ├── Button.tsx        # Component logic
│  │   │   ├── Button.style.ts   # Styled component styles
│  │   │   ├── Button.type.ts    # Type definitions
│  │   │   ├── Button.test.tsx   # Unit tests
│  ├── GameScreen.tsx         # Main screen component
│  ├── GameScreen.test.tsx         # Integration tests
├── styles/                   # Global screen styles
├── types/                    # Global types
├── utils/                    # Reusable utility functions
├── App.tsx                   # Main application component
└── main.tsx                  # Entry point
```

## File Structure

### Guidelines for Adding Components

To maintain consistency in the repository, all components should follow this structure:

```
ComponentName/
├── ComponentName.tsx      # The main React component
├── ComponentName.style.ts # Styled-component or MUI styling
├── ComponentName.type.ts  # Type definitions
├── ComponentName.test.tsx # Unit test file
```

#### Component File (ComponentName.tsx)

- Define the component and ensure it follows TypeScript best practices.
- Use functional components with hooks where applicable.
- Keep logic minimal in the component itself—move complex logic to hooks or utility
  functions.

#### Styles (ComponentName.style.ts)

- Define all styles using either styled-components or MUI's sx prop.
- Ensure styles are modular and not inline inside the component.

#### types (ComponentName.type.ts)

- Store all type definitions related to the component here.
- Import them into the component for usage.

#### Tests (ComponentName.test.tsx)

- Every component must have a corresponding test file.
- Use Vitest and @testing-library/react for unit testing.
- Ensure tests cover rendering, props, and any interactive behavior.

## Testing

This project uses Vitest for unit testing.

### Run Tests

```bash
npm run test
```

Tests are expected for every utility function and component. To identity a file's
corresponding test, it'll be it's original file name followed by `.test.<file_ext>`

For consistency, use the existing written tests for styling guidelines to write tests

```
describe('fetchCategories', () => {
  let result: CategoryPreview[];

  beforeEach(async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategoryList),
      } as Response),
    );

    result = await fetchCategories();
  });

  it('asserts is of categoryPreview', async () => {
    expect(result as CategoryPreview[]).toBeDefined();
  });
});

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

### Building a Release

1. Ensure all tests pass before building:
   ```bash
   npm run test
   npm run build
   ```
2. Update the version number in the `package.json` (frontend) and `pyproject.toml` (
   backend) files.
3. Create a Git tag for the release:
   ```bash
   git tag -a v1.0 -m "Release v1.0"
   git push origin v1.0
   ```

## Supported browsers

Without a polyfill, the Web Speech API is largely only supported by Google browsers. As
of May 2021, the following browsers support the Web Speech API:

- Chrome (desktop): this is by far the smoothest experience
- Safari 14.1
- Microsoft Edge
- Chrome (Android): a word of warning about this platform, which is that there can be an
  annoying beeping sound when turning the microphone on. This is part of the Android OS
  and cannot be controlled from the browser
- Android webview
- Samsung Internet
