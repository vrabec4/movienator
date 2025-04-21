# Movienator

A modern movie search application built with React, TypeScript, and Material UI. Movienator allows users to search for movies, view detailed information, and save their favorites for later viewing.

## Features

- Search for movies using The Movie Database API
- View detailed information about movies
- Save favorite movies for quick access
- Responsive design works on both desktop and mobile
- Theme-aware UI with smooth transitions

## Technologies

- React 19
- TypeScript
- Vite
- Material UI 7
- React Router 7
- TanStack React Query for data fetching and caching
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the production-ready application
- `npm run lint` - Run ESLint to check for code quality issues
- `npm run format` - Format code using Prettier
- `npm run preview` - Preview the production build locally

## Project Structure

```
src/
  ├── assets/         # Static assets like images
  ├── components/     # Reusable UI components
  ├── features/       # Feature-specific functionality
  ├── hooks/          # Custom React hooks
  ├── lib/            # Utilities and configuration
  ├── pages/          # Page components for routing
  ├── theme/          # Theme configuration
  └── types/          # TypeScript type definitions
```
