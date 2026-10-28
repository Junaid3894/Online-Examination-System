
/* File: src/components/Login/Login.jsx */

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const { user, signup, login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect users who already have an active session.
  if (user) {
    return (
      <Navigate
        to={user.role === "teacher" ? "/teacher" : "/student"}
        replace
      />
    );
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setError("");
    setSuccess("");
    setPassword("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      if (mode === "signup") {
        // Register the account only.
        signup({
          name,
          email,
          password,
          role,
        });

        // Do not automatically log the new user in.
        setPassword("");
        setMode("login");

        setSuccess(
          "Registration successful! Please log in using your registered credentials."
        );

        return;
      }

      // Login is allowed only for a registered account.
      const loggedIn = login({
        email,
        password,
        role,
      });

      // Redirect according to the registered role.
      navigate(
        loggedIn.role === "teacher"
          ? "/teacher"
          : "/student",
        { replace: true }
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-aside">
        <div className="auth-aside-brand">
          <span className="brand-mark">
            <BookOpen size={22} />
          </span>
          <strong>ExamFlow</strong>
        </div>

        <div className="aside-content">
          <span className="eyebrow">
            LEARN. ASSESS. IMPROVE.
          </span>

          <h1>
            Every exam is a step toward your next goal.
          </h1>

          <p>
            A focused space to conduct assessments,
            manage exams, and track performance.
          </p>

          <div className="aside-stat-row">
            <div>
              <strong>01</strong>
              <span>Create an account</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Sign in securely</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Start learning</span>
            </div>
          </div>
        </div>

        <div className="aside-footer">
          ExamFlow · Frontend demo
        </div>
      </section>

      <section className="auth-main">
        <div className="auth-card">
          <div className="mobile-brand">
            <span className="brand-mark">
              <BookOpen size={20} />
            </span>
            <strong>ExamFlow</strong>
          </div>

          <span className="eyebrow">
            WELCOME TO EXAMFLOW
          </span>

          <h2>
            {mode === "login"
              ? "Sign in to your account"
              : "Create your account"}
          </h2>

          <p className="auth-subtitle">
            {mode === "login"
              ? "Sign in with your registered credentials."
              : "Register first before logging in."}
          </p>

          <div
            className="role-switch"
            aria-label="Choose account role"
          >
            <button
              type="button"
              className={role === "student" ? "active" : ""}
              onClick={() => {
                setRole("student");
                setError("");
                setSuccess("");
              }}
            >
              <GraduationCap size={18} />
              Student
            </button>

            <button
              type="button"
              className={role === "teacher" ? "active" : ""}
              onClick={() => {
                setRole("teacher");
                setError("");
                setSuccess("");
              }}
            >
              <BriefcaseBusiness size={18} />
              Teacher
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            {mode === "signup" && (
              <label>
                Full name

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                  minLength={2}
                  required
                />
              </label>
            )}

            <label>
              Email address

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password

              <div className="password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="At least 8 characters"
                  autoComplete={
                    mode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((visible) => !visible)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </label>

            {error && (
              <div className="form-error" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="form-success" role="status">
                {success}
              </div>
            )}

            <button
              className="primary-button auth-submit"
              type="submit"
            >
              {mode === "login"
                ? "Sign in"
                : "Create account"}

              <ArrowRight size={17} />
            </button>
          </form>

          <p className="auth-toggle">
            {mode === "login"
              ? "Don't have an account?"
              : "Already registered?"}

            <button
              type="button"
              onClick={() =>
                changeMode(
                  mode === "login" ? "signup" : "login"
                )
              }
            >
              {mode === "login"
                ? "Sign up"
                : "Sign in"}
            </button>
          </p>

          <div className="demo-note">
            <strong>Demo authentication</strong>

            <span>
              Sign up first with your name, email, password,
              and role. Then log in using the same details.
              The selected role must match your registered role.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
