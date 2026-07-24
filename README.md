# Photo Gallery

A modern responsive photo gallery built with Next.js and TypeScript.

The project focuses on immersive image viewing: large-format photos, fullscreen mode, adaptive layouts, and smooth interactions across desktop and touch devices.

## 🎯 Features

- Responsive gallery experience for desktop, tablet, and mobile
- Photo collections organized by categories
- Interactive thumbnail filmstrip powered by Swiper.js
- Hover-based navigation on desktop and touch-friendly controls on mobile
- Fullscreen image viewer with swipe gestures and keyboard navigation
- Optimized image loading: prioritized main images and lazy-loaded thumbnails
- Separate image versions for previews and fullscreen viewing
- Custom image proxy API for handling external image sources
- Custom 404 page and scroll-to-top functionality

## 🧩 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Carousel:** Swiper.js
- **Images:** Next/Image
- **Architecture:** React hooks, reusable components, and custom hooks

## 💡 About the Project

This project was built with a focus on clean architecture, maintainable code, and a smooth user experience.

The application separates UI components from interaction logic using reusable components and custom hooks. Photo data and descriptions are managed through structured JSON files, making content updates simple while keeping the application lightweight.

## ⚡ Performance

- Lazy loading for thumbnail images
- Responsive image rendering with Next/Image
- Optimized layouts using CSS Modules
- Custom image proxy for working with external image storage

## 🚀 Getting Started

```bash
pnpm install

pnpm dev

pnpm build
```
