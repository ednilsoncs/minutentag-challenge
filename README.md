# Challenge Minutentag

This is a React application built with TypeScript, Vite, and several other libraries to provide a robust development environment and efficient client-side routing, state management, and data fetching. Additionally, this application is a Progressive Web App (PWA), allowing it to provide a more app-like experience on the web.

## Important Scripts

- **Development**: To start the development server, run:
  ```bash
  npm run dev
  ```

- **Build**: To create a production build, run:
  ```bash
  npm run build
  ```

- **Lint**: To lint the codebase, run:
  ```bash
  npm run lint
  ```

- **Preview**: To preview the production build, run:
  ```bash
  npm run preview
  ```

## Key Dependencies

- **[@tanstack/react-query](https://react-query.tanstack.com/)**: Used for fetching, caching, and updating data in React applications.
- **[axios](https://axios-http.com/)**: A promise-based HTTP client for making requests to the server.
- **[react](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[react-dom](https://reactjs.org/docs/react-dom.html)**: Serves as the entry point to the DOM and server renderers for React.
- **[react-router-dom](https://reactrouter.com/)**: Declarative routing for React applications.
- **[zustand](https://zustand.surge.sh/)**: A small, fast, and scalable state-management solution using simplified API.

## Key DevDependencies

- **[@types/react](https://www.npmjs.com/package/@types/react)**: TypeScript type definitions for React.
- **[@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)**: A set of tools for linting TypeScript code.
- **[@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react)**: Vite plugin to handle React files.
- **[eslint](https://eslint.org/)**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **[prettier](https://prettier.io/)**: An opinionated code formatter.
- **[sass](https://sass-lang.com/)**: A CSS preprocessor to make writing CSS easier.
- **[typescript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript.
- **[vite](https://vitejs.dev/)**: A fast development build tool and dev server.
- **[vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/)**: A Vite plugin to integrate PWA capabilities into the application.

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Update the environment variables**:
   Copy the `.env.example` file to `.env` and update the variables as needed.
   ```bash
   cp .env.example .env
   ```

3. **Ensure the backend project is running**:
   The frontend application depends on a backend project. Make sure to start the backend server before running the frontend. You can find the backend project here: [minutentag-challenge-backend](https://github.com/ednilsoncs/minutentag-challenge-backend).

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Build the application**:
   ```bash
   npm run build
   ```

6. **Preview the production build**:
   ```bash
   npm run preview
   ```
