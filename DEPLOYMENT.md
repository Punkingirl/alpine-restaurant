# Alpine Restaurant - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Your code should be in a Git repository
3. **Firebase Project**: Set up Firebase for authentication and database

## Step 1: Prepare Your Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication (Email/Password, Google, etc.)
4. Enable Firestore Database
5. Enable Storage (if using image uploads)
6. Get your Firebase configuration from Project Settings

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing your Alpine Restaurant project

2. **Configure Project**:
   - Framework Preset: Next.js (should auto-detect)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (should auto-detect)
   - Output Directory: `.next` (should auto-detect)

3. **Set Environment Variables**:
   Add the following environment variables in Vercel dashboard:

   ```
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # NextAuth Configuration
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_nextauth_secret_key

   # Email Configuration (if using nodemailer)
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your_email@gmail.com
   EMAIL_SERVER_PASSWORD=your_app_password

   # Optional: Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
   vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   # ... repeat for all environment variables
   ```

## Step 3: Configure Firebase for Production

1. **Update Firebase Auth Domains**:
   - Go to Firebase Console → Authentication → Settings → Authorized Domains
   - Add your Vercel domain: `your-project.vercel.app`

2. **Update Firestore Rules** (if needed):
   - Go to Firebase Console → Firestore Database → Rules
   - Ensure your security rules allow your app to read/write

3. **Update Storage Rules** (if using image uploads):
   - Go to Firebase Console → Storage → Rules
   - Ensure your storage rules allow your app to upload files

## Step 4: Test Your Deployment

1. **Test Authentication**:
   - Try registering/logging in
   - Verify Firebase Auth is working

2. **Test Database Operations**:
   - Create a test order
   - Verify Firestore is working

3. **Test Image Uploads** (if applicable):
   - Upload a test image
   - Verify Firebase Storage is working

## Step 5: Custom Domain (Optional)

1. **Add Custom Domain**:
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **Update Environment Variables**:
   - Update `NEXTAUTH_URL` to your custom domain
   - Update Firebase Auth Domains to include your custom domain

## Troubleshooting

### Common Issues:

1. **Build Errors**:
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript errors are resolved or ignored

2. **Environment Variables**:
   - Verify all Firebase config variables are set
   - Check that `NEXTAUTH_URL` matches your deployment URL

3. **Firebase Connection**:
   - Ensure Firebase project is in the same region as your Vercel deployment
   - Check Firebase console for any quota limits

4. **CORS Issues**:
   - Update Firebase Auth authorized domains
   - Check Firestore/Storage rules

### Environment Variables Reference:

Copy these from your Firebase project settings:

```bash
# Get these from Firebase Console → Project Settings → General → Your Apps → Web App
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Firebase console for errors
3. Verify all environment variables are set correctly
4. Test locally with the same environment variables 