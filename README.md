# SmartSight 🚀

> AI-Powered Early Risk Detection & Guidance System for Urban Youth

A premium, modern website built with React + Vite, Firebase, and deployed on Vercel. Features stunning dark theme design, smooth animations, and comprehensive information about SmartSight's AI-powered platform.

![SmartSight](https://img.shields.io/badge/Status-Ready%20for%20Deployment-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.1.3-purple)
![Firebase](https://img.shields.io/badge/Firebase-10.7.0-orange)

## 🚀 Quick Start (Demo Mode)

This project runs in **DEMO MODE** by default - no Firebase setup required!

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lakhan-18/smartsight-website.git
   cd smartsight-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Visit `http://localhost:5173`
   - Use any email/password to sign up or log in!

## 🎯 Demo Mode Features

- ✅ **No Firebase configuration needed**
- ✅ **Simulated authentication** - any email/password works
- ✅ **Full feature preview** with mock data
- ✅ **Perfect for testing and showcasing**

## ✨ Features

### 🎨 Premium Design
- **Dark Theme** with vibrant gradient accents (purple, blue, cyan)
- **Glassmorphism Effects** for modern, frosted glass UI
- **Smooth Animations** using Framer Motion and AOS
- **Responsive Design** optimized for mobile, tablet, and desktop

### 📱 Landing Page Sections
1. **Hero** - Full-screen with animated gradient orbs and statistics
2. **Problem Statement** - 4 challenge cards highlighting urban youth issues
3. **Features** - 6 key innovations with gradient icons
4. **Tech Stack** - Google Cloud, AI/ML, and frontend technologies
5. **Architecture** - 3-layer system visualization
6. **Impact** - Data visualizations with Recharts (bar and pie charts)
7. **Ethics & Privacy** - 4 privacy-first principles
8. **CTA** - Email signup with Firebase Firestore integration
9. **Footer** - Navigation, social links, and copyright

### 🔥 Firebase Integration
- **Firestore Database** for email waitlist
- **Authentication** setup ready
- **Analytics** configured
- Real-time form validation and error handling

### ⚡ Performance
- **Code Splitting** for optimized bundle sizes
- **Lazy Loading** for routes
- **GPU-Accelerated** CSS animations
- **Fast Development** with Vite HMR

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   cd smartsight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Firebase configuration.

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel Dashboard](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📦 Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 6.1** - Build tool
- **React Router 6.20** - Routing
- **Framer Motion 10.16** - Animations
- **AOS 2.3** - Scroll animations

### UI Components
- **Material UI 5.14** - Icons
- **Recharts 2.10** - Data visualizations
- **Custom Components** - Button, Card, GradientText

### Backend
- **Firebase 10.7** - Backend services
  - Firestore - Database
  - Authentication - User management
  - Analytics - Usage tracking

### Styling
- **Vanilla CSS** - Maximum flexibility
- **CSS Custom Properties** - Design tokens
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
smartsight/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   └── sections/        # Landing page sections
│   ├── pages/               # Page components
│   ├── config/              # Firebase configuration
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment config
├── DEPLOYMENT.md            # Deployment guide
└── package.json             # Dependencies
```

## 🎨 Design System

### Colors
- **Primary Purple**: `#8b5cf6`
- **Blue**: `#3b82f6`
- **Cyan**: `#06b6d4`
- **Pink**: `#ec4899`
- **Backgrounds**: `#0a0a0f`, `#12121a`, `#1a1a27`

### Typography
- **Display**: Space Grotesk
- **Body**: Inter
- **Fluid Scaling**: Using `clamp()` for responsive typography

### Animations
- Entrance: Fade in, slide in, scale in
- Hover: Lift, glow, shimmer
- Continuous: Gradient flow, float, pulse

## 🔐 Firebase Setup

1. Create project in [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Copy configuration to `.env` file
5. Deploy Firestore security rules (see DEPLOYMENT.md)

## 📝 Environment Variables

Create a `.env` file with the following:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🤝 Contributing

This is a TechSprint project for SmartSight. For contributions or questions, please contact the project team.

## 📄 License

Copyright © 2025 SmartSight. All rights reserved.

## 🙏 Acknowledgments

- **Google AI Technologies** - Powering the SmartSight platform
- **Firebase** - Backend infrastructure
- **Vercel** - Deployment platform
- **React Community** - Amazing ecosystem

---

**Built with ❤️ for urban youth well-being**

🌟 **Star this project** if you find it helpful!
