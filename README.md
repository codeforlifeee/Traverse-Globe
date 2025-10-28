# Traverse Globe - React + Vite + Tailwind CSS

A modern travel website built with React, Vite, and Tailwind CSS. This is a complete conversion of the original HTML/CSS/JS website to a React-based single-page application.

## 🚀 Features

- ⚡️ **Vite** - Lightning-fast development server and build tool
- ⚛️ **React 18** - Latest React features with hooks
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Swiper** - Modern touch slider for carousels
- 🧭 **React Router** - Client-side routing
- 📱 **Fully Responsive** - Mobile-first design
- ✨ **Smooth Animations** - Beautiful transitions and effects
- 🎯 **Font Awesome Icons** - Comprehensive icon library

## 📦 Project Structure

```
traverseglobe-react-vite-tailwindcss/
├── public/
│   └── logo.webp              # Website logo
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Navigation header
│   │   ├── Footer.jsx         # Footer section
│   │   ├── FloatingButtons.jsx # WhatsApp & Call buttons
│   │   ├── HeroSection.jsx    # Hero banner with search
│   │   ├── TrendingDestinations.jsx
│   │   ├── TopDestinations.jsx
│   │   ├── ToursPackagesBanner.jsx
│   │   ├── FeedbackSection.jsx
│   │   ├── ExplorePrices.jsx
│   │   └── WhyChooseUs.jsx
│   ├── pages/
│   │   ├── Home.jsx           # Homepage
│   │   ├── About.jsx          # About page
│   │   └── Contact.jsx        # Contact page with form
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles with Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production
npm run build
```

Build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Key Components

### Header Component
- Responsive navigation bar
- Mobile hamburger menu
- Smooth scroll animations
- Active link highlighting

### Hero Section
- Full-width image carousel using Swiper
- Search bar overlay
- Auto-play functionality

### Destinations Components
- **Trending Destinations** - International locations
- **Top Destinations** - Popular travel spots
- Hover effects with smooth transitions

### Feedback Section
- Interactive country cards
- Modal popup with testimonials
- Smooth animations

### Explore Prices
- Package cards with pricing
- Swiper carousel
- Star ratings and CTA buttons

### Why Choose Us
- Service cards with icons
- Auto-rotating carousel
- Hover effects

### Floating Buttons
- WhatsApp integration
- Direct call functionality
- Bounce animation effects

## 🎯 Routes

- `/` - Homepage
- `/about` - About Us page
- `/contact` - Contact page with form

## 🔧 Technologies Used

- **React 18.3.1** - UI library
- **Vite 5.4.21** - Build tool
- **Tailwind CSS 3.4.17** - CSS framework
- **React Router DOM 7.1.1** - Routing
- **Swiper 11.1.15** - Touch slider
- **Font Awesome 6.7.2** - Icons

## 🎨 Color Scheme

- **Primary**: `#667eea` (Purple Blue)
- **Secondary**: `#764ba2` (Purple)
- **Accent**: `#ff5b04` (Orange)

## ✨ Features Implemented

✅ Responsive Navigation with mobile menu
✅ Hero Banner with auto-play carousel
✅ Trending & Top Destinations sliders
✅ Customer Feedback with modal
✅ Package pricing cards
✅ Why Choose Us section
✅ Contact form with validation
✅ About page
✅ Floating WhatsApp & Call buttons
✅ Footer with social links
✅ Smooth animations and transitions
✅ Mobile-first responsive design

## 🚀 Quick Start

1. Clone/Download the project
2. Navigate to the project folder
3. Run `npm install`
4. Run `npm run dev`
5. Open `http://localhost:5173/` in your browser

---

**Built with ❤️ using React + Vite + Tailwind CSS**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
