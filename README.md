# Customer Management Dashboard

A monorepo application for managing customer data, built with a React + Vite frontend, an Express + TypeScript backend, and shared schema/types in a shared package.

## Project Structure

- `client/` - React frontend built with Vite and TypeScript.
- `server/` - Express backend with TypeScript, Swagger documentation, logging, validation, and rate limiting.
- `shared/` - Shared TypeScript schemas and types used by both client and server.

## Key Features

- Customer CRUD dashboard UI
- API validation and error handling
- Shared types and schemas across frontend and backend
- Swagger documentation for the API
- ESLint and TypeScript support

## Getting Started

### Install dependencies

From the project root:

```bash
npm install
```

This installs dependencies for `client`, `server`, and `shared` using npm workspaces.

### Run the frontend

```bash
cd client
npm run dev
```

Open the URL shown by Vite to view the dashboard.

### Run the backend

```bash
cd server
npm run build
npm start
```

The server compiles TypeScript and starts the Express API.

## Development Workflow

### Frontend scripts

From `client/`:

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint on the frontend source

### Backend scripts

From `server/`:

- `npm run build` - Generate Swagger docs and bundle the backend with esbuild
- `npm start` - Start the compiled backend from `dist/`
- `npm test` - Run backend tests

### Shared package scripts

From `shared/`:

- `npm run typecheck` - Run TypeScript type checking for shared files

## Notes

- The backend uses `express`, `helmet`, `cors`, `morgan`, `express-rate-limit`, `swagger-jsdoc`, and `swagger-ui-express`.
- The frontend uses React, MUI, React Hook Form, React Query, and Axios.
- Shared validation uses Zod schemas and exported types for consistent typing across packages.

## Useful Links

- Frontend entry: `client/src/main.tsx`
- Backend entry: `server/src/server.ts`
- Shared schemas: `shared/schemas/customer.schema.ts`
- API routes: `server/src/modules/customer/customer.routes.ts`

## License

This project is private and configured as a workspace monorepo.
