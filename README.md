# Shikhar Kumar Portfolio

Live: https://shikharkumar.in

A personal portfolio built with Next.js, TypeScript, and Tailwind CSS.

This project is designed as a single-page application that presents structured professional data including projects, experience, skills, and recommendations, with a focus on performance, maintainability, and clean UI.

---

## Overview

The portfolio is implemented as a data-driven application where all content is centralized and rendered through reusable components.

The goal of this project was to:

- build a clean and responsive UI
- maintain a clear separation between data and presentation
- create reusable and composable components
- ensure smooth navigation and good user experience
- keep the system easy to update and extend

---

## Architecture

The application follows a simple but intentional structure:

- **App layer** handles layout, routing, and global configuration
- **Component layer** is divided into sections and reusable UI primitives
- **Data layer** centralizes all content in a single source file

All portfolio content is defined in `src/lib/data.ts`, which allows updating the site without modifying UI logic.

---

## Project Structure

```bash
src/
  app/
    layout.tsx
    page.tsx
    globals.css

  components/
    sections/
    ui/
    header.tsx
    footer.tsx

  lib/
    data.ts
    utils.ts
```
---

## Key Design Decisions

### Data-driven content

All content is stored in a single file and mapped into UI components.

This avoids duplication and makes updates straightforward.

---

### Component separation

Sections and UI primitives are separated to improve reusability and readability.

---

### Single-page layout

The application uses a single-page structure with section-based navigation instead of multiple routes.

This simplifies navigation and improves user experience.

---

### Theme system

Light and dark themes are implemented using a theme provider with persisted user preference.

---

## Features

- Responsive layout across devices
- Smooth scrolling navigation
- Active section tracking
- Light and dark mode support
- Structured and reusable components
- Centralized content management

---

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- next-themes

---

## Running Locally

Install dependencies:

npm install

Start development server:

npm run dev

The app runs on:

http://localhost:9002

---

## Notes

This project is continuously updated as I refine the UI, improve structure, and add new content.

---

## Contact

- Portfolio: https://shikharkumar.in
- GitHub: https://github.com/Shikhar16078
- LinkedIn: https://www.linkedin.com/in/shikhar1999/