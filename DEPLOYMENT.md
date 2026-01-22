# SmartSight - Deployment Guide

## Quick Start

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your Firebase configuration values

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Open http://localhost:5173/ in your browser

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project named "SmartSight"
   - Enable Firestore Database
   - Enable Authentication (Email/Password)

2. **Get Configuration**
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Web" icon to add a web app
   - Copy the configuration values to your `.env` file

3. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /waitlist/{document} {
         allow create: if true;
         allow read, update, delete: if false;
       }
     }
   }
   ```

### Vercel Deployment

1. **Connect Repository**
   - Push your code to GitHub
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all Firebase configuration variables:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_FIREBASE_MEASUREMENT_ID`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - Your site will be live at `https://your-project.vercel.app`

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### Firebase Connection Issues
- Verify all environment variables are set correctly
- Check Firebase project is active
- Ensure Firestore is enabled

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Deployment Issues
- Verify environment variables are set in Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
