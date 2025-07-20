# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (includes TypeScript compilation)
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Project Architecture

This is a React + TypeScript + Vite blog application with Firebase backend integration. The app features user authentication, blog management with rich text editing, and role-based access control.

### Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS (v4.1.10) with Vite plugin
- **State Management**: Zustand for client state management
- **Routing**: React Router DOM v7 with protected routes
- **Rich Text Editor**: BlockNote with Mantine integration and code block support
- **Backend**: Firebase (Authentication + Firestore) with Supabase client also configured
- **Icons**: Lucide React and React Icons

### Application Structure

The application follows a feature-based architecture:

- **Authentication**: Firebase Auth with email/password, managed via `authStore.ts`
- **Blog Management**: Full CRUD operations with rich text content, visibility controls, and user ownership
- **State Management**: Zustand stores for auth (`authStore.ts`) and blog operations (`blogStore.ts`)
- **Protected Routes**: Authentication-required pages wrapped with `ProtectedRoute` component
- **Rich Content**: BlockNote editor for blog content with section-based organization

### Key Features

- **User Authentication**: Sign up, sign in, sign out with Firebase Auth
- **Blog CRUD**: Create, read, update, delete blogs with rich text editing
- **Access Control**: Public/private/unlisted visibility settings with owner-based permissions
- **Content Management**: Section-based blog structure with tags, categories, and metadata
- **Real-time Data**: Firestore integration with security rules for data protection

### Data Models

Blogs have comprehensive metadata including:
- Status: draft, published, archived, deleted, pending-review
- Visibility: public, private, unlisted
- User ownership and permissions
- Rich content sections with BlockNote format
- Timestamps and user attribution

### Security

- Firestore security rules enforce user-based access control
- Environment variables for Firebase configuration
- Protected routes prevent unauthorized access
- Owner-based blog permissions

### Build Process

The build process uses TypeScript compilation (`tsc -b`) followed by Vite bundling. All builds should be linted before deployment.