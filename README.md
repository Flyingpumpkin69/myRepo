# Retro Futuristic Portfolio

A full-stack neo-retro cyberpunk styled portfolio displaying projects, skills, and containing a functional contact form.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Nodemailer

## Environment Variables Needed

### Backend (`backend/.env`)
Create a `.env` file in the `backend` directory with the following:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=yashrajsinh3674@gmail.com
EMAIL_PASS=your_gmail_app_password
```
*(To get an App Password for Gmail, go to Google Account Security -> 2-Step Verification -> App Passwords)*

### Frontend (`frontend/.env.local`)
Create a `.env.local` file in the `frontend` directory:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```
*(In production, set this to your hosted backend URL, e.g., `https://myportfolio-yash.onrender.com`)*

## Running Locally

1. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment Recommendations
- **Frontend**: Deploy on [Vercel](https://vercel.com). Simply link your GitHub repo and configure the `NEXT_PUBLIC_BACKEND_URL` environment variable.
- **Backend**: Deploy on [Render](https://render.com) or Heroku. Make sure to add `MONGODB_URI`, `EMAIL_USER`, and `EMAIL_PASS` in the environment variable settings on the hosting platform. Ensure you start the server via `npm start`.
