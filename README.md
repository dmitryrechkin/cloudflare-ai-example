# Cloudflare AI Example

## Retrieval Augmented Generation (RAG) AI

This project is a full-stack application designed for educational purposes to explore the concept of Retrieval Augmented Generation (RAG) AI. RAG combines the power of information retrieval and natural language generation to provide accurate and contextually relevant answers to user queries. It leverages Cloudflare Pages, AI, D1, and Vectorize to provide a powerful question/answer system. Users can add questions and answers to the system, which then finds the most relevant answers based on the given question and then uses an AI model to generate a coherent and precise response based on the retrieved information.

## Search Workflow

1. **Question**: User submits a question.
2. **Convert to Vector Embeddings**: The question is converted to vector embeddings using an AI model.
3. **Search Vector Database**: The vector embeddings are used to search the vector database (Vectorize) for matched questions.
4. **Generate Answer**: Based on the found answers, the AI produces a coherent combined answer to the given question.

## Add Workflow

1. **Question**: User submits a question with an answer.
2. **Add to Database**: The question and answer are added to the database.
3. **Convert to Vector Embeddings**: The question is converted to vector embeddings using an AI model.
4. **Add to Vector Database**: The vector embeddings are added to the vector database with a reference to the question ID.

## Features

- Add questions and answers to the system.
- Search for the most relevant answer based on a given question using AI.
- Clean and maintainable codebase following clean architecture principles.
- Deployed on Cloudflare Pages for high availability and scalability.

## Project Architecture

The project follows clean architecture and clean code principles to ensure a scalable, maintainable, and testable codebase. The architecture is divided into several layers, each with a specific responsibility:

1. **Presentation Layer**: 
   - Handles the user interface and user interactions.
   - Implemented using Cloudflare Pages and built with Vite.
   - This includes the frontend components located in the `src/frontend/` directory.

2. **Application Layer**: 
   - Contains the application logic.
   - Coordinates the flow of data between the presentation and domain layers.
   - Located within the `src/backend/` directory, this layer includes controllers, routes, and middlewares that facilitate the interaction between the user interface and the core business logic.

3. **Domain Layer**: 
   - The core of the application, containing the business logic and domain entities.
   - Represents the services and types used by both the frontend and backend, ensuring a separation of concerns and a clean architecture.
   - This can be seen in the `src/types/` and `src/backend/services/` directories.

4. **Infrastructure Layer**: 
   - Manages communication with external services and data persistence.
   - Includes integration with Cloudflare D1 for database operations and Vectorize for AI capabilities.
   - Found in the `src/backend/repositories/` directory, this layer abstracts the details of how data is stored, retrieved, and processed, enabling seamless interaction with the database and AI services.

## Directory Structure

```
cloudflare-ai-example/
├── src/                # Source code
│   ├── backend/        # Backend logic
│   │   ├── builders/       # Builders for constructing complex objects
│   │   ├── controllers/    # Controllers to handle HTTP requests
│   │   ├── factories/      # Factories for creating instances
│   │   ├── middlewares/    # Middleware for request processing
│   │   ├── repositories/   # Data access repositories
│   │   ├── routes/         # Route definitions
│   │   ├── services/       # Business logic services
│   │   └── types/          # Type definitions for backend
│   ├── frontend/       # Frontend logic
│   │   ├── components/     # UI components
│   │   └── app.tsx         # Main application entry point
│   ├── libraries/      # Shared libraries
│   └── types/          # Shared type definitions
├── package.json        # NPM package file
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── wrangler.toml       # Cloudflare Wrangler configuration
```

## Getting Started

### Prerequisites

- Node.js
- Cloudflare account
- Wrangler CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cloudflare-ai-example.git
   cd cloudflare-ai-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Cloudflare D1:
   - Configure your `wrangler.toml` with the necessary D1 bindings.

4. Set up AI capabilities with Vectorize:
   - Follow the documentation for Vectorize to obtain the necessary API keys and configure the application.

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Deploy to Cloudflare Pages:
   ```bash
   npm run deploy
   ```

### Scripts

- **Lint**: Run ESLint to check for code quality issues:
  ```bash
  npm run lint
  ```

- **Format**: Run ESLint with the `--fix` option to automatically fix code quality issues:
  ```bash
  npm run format
  ```

- **Serve**: Serve the application using Vite's development server:
  ```bash
  npm run serve
  ```

- **Build**: Run local database migrations and build the client and server code:
  ```bash
  npm run build
  ```

- **Preview**: Run local database migrations and preview the built application using Wrangler:
  ```bash
  npm run preview
  ```

- **Deploy**: Run remote database migrations, build the client and server code, and deploy to Cloudflare Pages:
  ```bash
  npm run deploy
  ```


## Acknowledgements

- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Vectorize](https://developers.cloudflare.com/vectorize/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Hono Web aApplication framework](https://hono.dev/)
- [Build a Retrieval Augmented Generation (RAG) AI](https://developers.cloudflare.com/workers-ai/tutorials/build-a-retrieval-augmented-generation-ai/)
- [Original Example](https://github.com/kristianfreeman/cloudflare-retrieval-augmented-generation-example/tree/main)

## Educational Purpose

This project serves as an excellent learning tool for developers looking to understand and implement AI, embeddings, and vector databases. By exploring this codebase, you will gain hands-on experience with clean architecture, clean code principles, and modern full-stack development practices. The use of Vite for building both client and backend entry points ensures a smooth and efficient development process.

## Note on Unit Tests

Please note that this project does not include any unit tests, which should be a part of normal practice. The goal of this project was to explore the Retrieval Augmented Generation (RAG) AI and not necessarily to be a perfect solution. However, it aims to use better coding practices, such as clean architecture and clean code.

## Disclaimer

This description is generated with the assistance of AI.
