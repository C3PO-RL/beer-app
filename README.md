This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Firebase Setup Guide

This guide will walk you through setting up Firebase for the Beer App project and obtaining the necessary environment variables.

## Step 1: Create a Firebase Account

If you don't already have a Firebase account, go to [firebase.google.com](https://firebase.google.com/) and sign up using your Google account.

## Step 2: Create a New Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project"
3. Enter a project name (e.g., "Beer App")
4. Choose whether to enable Google Analytics (recommended)
5. Accept the terms and click "Create project"
6. Wait for the project to be created, then click "Continue"

## Step 3: Set Up Firestore Database

1. In the Firebase Console, select your project
2. In the left sidebar, click on "Firestore Database"
3. Click "Create database"
4. Choose "Start in test mode" for development (you can change this later)
   - Note: Test mode allows read/write access to your database without authentication. For production, you should set up proper security rules.
5. Select a location for your Firestore database (choose the region closest to your users)
6. Click "Enable"

## Step 4: Register Your Web App

1. In the Firebase Console, click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
2. Scroll down to the "Your apps" section
3. Click on the web icon (</>) to add a web app
4. Register your app with a nickname (e.g., "Beer App Web")
5. Check the box for "Also set up Firebase Hosting" if you plan to deploy using Firebase Hosting
6. Click "Register app"
7. You'll see the Firebase configuration object that contains all the environment variables you need

## Step 5: Get Your Environment Variables

After registering your app, you'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## App is deployed here

`https://beer-nmglv1gck-c3porls-projects.vercel.app/`
