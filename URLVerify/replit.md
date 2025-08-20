# Overview

PhishGuard is a URL security detection application designed to identify phishing websites and protect users from malicious URLs. The application provides real-time analysis of URLs, checking them against security databases and using pattern matching to detect potential threats. It features a modern React frontend with a Node.js/Express backend, offering users an intuitive interface to check URL safety with detailed security reports and educational security tips.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with **React 18** using **TypeScript** and **Vite** as the build tool. The application follows a component-based architecture with:

- **Routing**: Uses `wouter` for client-side routing with a simple Switch/Route pattern
- **State Management**: Leverages React Query (`@tanstack/react-query`) for server state management and data fetching
- **UI Components**: Implements shadcn/ui design system with Radix UI primitives for accessible, consistent components
- **Styling**: Uses Tailwind CSS with custom CSS variables for theming and responsive design
- **Form Handling**: Uses React Hook Form with Zod validation for type-safe form management

The frontend architecture separates concerns with dedicated directories for components, pages, hooks, and utilities. The main application flow centers around a URL checking form that communicates with the backend API and displays security analysis results.

## Backend Architecture

The backend uses **Express.js** with TypeScript in an ESM configuration. Key architectural decisions include:

- **API Structure**: RESTful API design with a single `/api/check-url` endpoint for URL security analysis
- **Request Processing**: Middleware-based request logging and error handling
- **Mock Security Engine**: Implements a demonstration phishing detection system using pattern matching and probability-based threat assessment
- **Data Storage**: Uses in-memory storage with a pluggable storage interface for future database integration
- **Development Setup**: Integrates Vite middleware for hot module replacement during development

The backend is designed with separation of concerns, featuring dedicated modules for routing, storage abstraction, and development tooling.

## Data Storage Solutions

Currently implements **in-memory storage** using JavaScript Maps with a clean interface pattern:

- **Storage Interface**: Defines `IStorage` interface for CRUD operations on users
- **Memory Implementation**: `MemStorage` class provides temporary storage for development and testing
- **Database Ready**: Configured for PostgreSQL integration with Drizzle ORM, though not currently connected
- **Migration Support**: Includes Drizzle configuration for future database schema management

The storage layer is abstracted to allow easy migration from in-memory to persistent database storage.

## Authentication and Authorization

The application is currently configured for session-based authentication:

- **Session Management**: Uses `connect-pg-simple` for PostgreSQL session storage (configured but not implemented)
- **User Schema**: Defines user entities with ID and username fields in shared schema
- **Security Headers**: Implements credential-based requests for secure API communication
- **Future-Ready**: Architecture supports adding authentication middleware and user management

## External Dependencies

### Development and Build Tools
- **Vite**: Frontend build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **Drizzle Kit**: Database migration and schema management tool
- **ESBuild**: Backend bundling for production builds

### UI and Styling Framework
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives for complex UI elements
- **Tailwind CSS**: Utility-first CSS framework with custom theming
- **Lucide React**: Icon library for consistent iconography

### Data Management
- **React Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date formatting and manipulation utilities

### Backend Services
- **Express.js**: Web application framework
- **Neon Database**: PostgreSQL database service (configured for future use)
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL support

### Development Experience
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Error Handling**: Runtime error overlay for development debugging
- **Hot Reload**: Vite middleware integration for seamless development experience