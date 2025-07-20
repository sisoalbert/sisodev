# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build` (includes TypeScript compilation)
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Project Architecture

This is a React + TypeScript + Vite application with the following key characteristics:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS (v4.1.10) with Vite plugin
- **State Management**: Zustand for client state
- **Routing**: React Router DOM v7
- **Rich Text Editor**: BlockNote with Mantine integration
- **Backend Integration**: Supabase for database and auth
- **Icons**: Lucide React and React Icons

### Key Dependencies

- **UI Components**: Custom components with Tailwind CSS
- **Rich Text**: BlockNote editor with code block support
- **Database**: Supabase client for backend operations
- **State**: Zustand stores for application state

### Project Structure

- `src/App.tsx` - Main application component (currently minimal)
- `src/main.tsx` - Application entry point
- `src/index.css` - Global styles
- TypeScript configuration split across multiple files (tsconfig.json, tsconfig.app.json, tsconfig.node.json)
- ESLint configured with React-specific rules

### Build Process

The build process uses TypeScript compilation (`tsc -b`) followed by Vite bundling. All builds should be linted before deployment.