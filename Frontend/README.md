# ExamFlow — Online Examination System (Frontend)

React + Vite frontend prototype with mock authentication, role-protected pages, teacher exam creation, student exam-taking, countdown timer, automatic scoring, and result review.

## Requirements
- Node.js 18+ (Node.js 20 LTS is a sensible choice)
- npm
- VS Code (optional)

## Run in VS Code
1. Extract this ZIP.
2. Open the `online-examination-system` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite, usually `http://localhost:5173`.

To check a production build:

```bash
npm run build
npm run preview
```

## Demo sign-in
- Select **Student** or **Teacher**.
- Enter any valid email address, e.g. `student@example.com`.
- Enter a password of at least 4 characters, e.g. `demo1234`.
- Click **Sign in**. The selected role determines the dashboard.
- The sign-up toggle is a mock flow; it does not create a real account.

## Folder structure

```text
online-examination-system/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── context/
    │   ├── AuthContext.jsx
    │   └── ExamContext.jsx
    ├── styles/
    │   └── global.css
    └── components/
        ├── Navbar/
        │   ├── Navbar.jsx
        │   └── Navbar.css
        ├── Login/
        │   ├── Login.jsx
        │   └── Login.css
        ├── ProtectedRoute/
        │   ├── ProtectedRoute.jsx
        │   └── ProtectedRoute.css
        ├── TeacherDashboard/
        │   ├── TeacherDashboard.jsx
        │   └── TeacherDashboard.css
        ├── StudentDashboard/
        │   ├── StudentDashboard.jsx
        │   └── StudentDashboard.css
        ├── ExamPortal/
        │   ├── ExamPortal.jsx
        │   └── ExamPortal.css
        └── Result/
            ├── Result.jsx
            └── Result.css
```

## Implemented
- Login/sign-up mode and Student/Teacher role switch.
- Email format and minimum password length validation.
- Role-protected routes and logout.
- Teacher can create exams, add/remove questions, set four options and choose the correct answer.
- Student can view available/upcoming exams, navigate questions, answer MCQs, and submit.
- Countdown timer auto-submits when time expires.
- Result summary with score, correct/incorrect/unanswered counts, and review.
- Demo data and session persistence via `localStorage`.

## Important limitations
This is a frontend demo, not production authentication. The password is only validated in the browser and is not securely stored or verified. A student can inspect browser storage and client-side data, including correct answers. Teacher-created exams and all results are stored per browser, so they are not shared between separate users/devices. The timer can be manipulated by a user. Do not use this build for real exams or sensitive student data.

For production, add a backend (for example Express + MongoDB), server-side password hashing, authenticated sessions/tokens, server-side role authorization, server-controlled timing/submission, and server-side scoring. Do not send correct answers to the student browser before submission.
