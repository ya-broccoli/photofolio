# Photo Gallery

A modern responsive photo gallery and Progressive Web App built with Next.js and TypeScript.

🔗 **Live Demo:** https://photofolio-mu.vercel.app/

The project focuses on immersive image viewing: large-format photography, fullscreen mode, adaptive layouts, and smooth interactions across desktop and touch devices.

## 🎯 Features

- Responsive gallery experience for desktop, tablet, and mobile devices
- Photo collections organized by categories
- Interactive thumbnail filmstrip powered by Swiper.js
- Hover-based thumbnail navigation on desktop
- Touch-friendly interactions on mobile devices
- Fullscreen image viewer with:
  - swipe gestures
  - keyboard navigation
  - smooth transitions
- Optimized image loading:
  - prioritized main images
  - lazy-loaded thumbnails
- Separate image versions for preview and fullscreen viewing
- Custom image proxy API for external image sources
- Custom 404 page
- Scroll-to-top functionality

## 📱 Progressive Web App (PWA)

The application supports installation as a standalone app.

Implemented:

- Web App Manifest
- Service Worker with Serwist
- Precached application assets
- Install prompt for supported browsers
- Installation guidance for iOS/Safari users

After installation, the gallery can be launched from the device home screen as a standalone application.

## 🧩 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React
- **Styling:** CSS Modules
- **Carousel:** Swiper.js
- **Images:** Next/Image
- **PWA:** Serwist
- **Architecture:** reusable components, custom hooks, feature-based structure

## 💡 About the Project

This project was built with a focus on clean architecture, maintainable code, and smooth user experience.

The application separates UI components from interaction logic using reusable components and custom hooks.

Photo collections and descriptions are managed through structured JSON data, allowing simple content updates while keeping the application lightweight.

## ⚡ Performance

- Lazy loading for thumbnail images
- Responsive image rendering with Next/Image
- Optimized image delivery
- Separate preview and fullscreen image resources
- Efficient rendering for large photo collections
- Adaptive layouts for different screen sizes

## 🚀 Getting Started

```bash
pnpm install

pnpm dev

pnpm build
