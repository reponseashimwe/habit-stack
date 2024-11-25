
# Habit Tracker

This is a PWA-based Habit Tracker application that allows users to track, log, and classify habits. It supports authentication using Clerk (email and Google), and MongoDB for database management. The app is designed with Next.js and is installable on both mobile and PC. [Habit Tracker](https://habit-stack.vercel.com/)

---

## Features
- User authentication via Clerk (Google and Email).
- Habit creation, logging, and tracking.
- Habit classification for better organization.
- Automated notifications for reminders.
- Installable as a PWA for mobile and PC.

---

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js) or **pnpm** (if preferred)
- **MongoDB** (Cloud or Local instance)
- A **Clerk** account (for authentication)

---

### 1. Clone the Repository
```bash
git clone https://github.com/reponseashimwe/habit-stack.git
cd habit-tracker
```

### 2. Install Dependencies
Install all required dependencies using npm or pnpm:
```bash
npm install
# OR
pnpm install
```

### 3. Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmVsZXZhbnQtZ2FyLTEwLmNsZXJrLmFjY291bnRzLmRldiQ<your_key_here>
CLERK_SECRET_KEY=sk_test_ktci6oOa4dqK8rMqRIRsFexCC6DA4rENwvpR5l20Hw<your_key_here>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
MONGO_URL=mongodb+srv://repuser:xr7l94ddKltRFeN8@applications.wcxhz.mongodb.net/<your_key_here>
WEBHOOK_SECRET=whsec_qdR4SYun7GeHQQkdWtYDBXqNKdJWxKLH<your_key_here>
```

### 4. Run MongoDB
Ensure your MongoDB instance is running. If using a local MongoDB instance, make sure the connection string in `MONGO_URL` matches your setup.

### 5. Start the Development Server
Run the following command to start the Next.js development server:
```bash
npm run dev
# OR
pnpm dev
```

The application will be available at `http://localhost:3000`.

### 6. Build for Production (Optional)
To create a production-ready build, run:
```bash
npm run build
npm start
```

---

## Authentication with Clerk
This app uses Clerk for authentication. Ensure that your Clerk account is set up with the correct publishable and secret keys. Update the URLs in `.env.local` if needed.

- **Sign In URL**: `/sign-in`
- **Sign Up URL**: `/sign-up`
- **Redirect After Sign-In/Sign-Up**: `/dashboard`

---

## PWA Functionality
To install the app as a PWA on mobile or PC:
1. Open the app in a browser.
2. Click the "Install" button (or add to the home screen on mobile).
3. Enjoy the native-app-like access to the app.

---

## Troubleshooting
- **Issue with MongoDB Connection**: Verify that the `MONGO_URL` is correct and your MongoDB instance is running.
- **Clerk Setup Errors**: Ensure your Clerk API keys and URLs are accurate.
- **App Not Installing as PWA**: Check browser compatibility and ensure the service worker is registered.

---

## Contributing
If you'd like to contribute, fork the repository and create a pull request with your changes.

---

## License
This project is licensed under the MIT License.
