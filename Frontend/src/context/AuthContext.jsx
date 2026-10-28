
/* File: src/context/AuthContext.jsx */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const USERS_KEY = "examflow_users";
const SESSION_KEY = "examflow_session";

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  // Load registered demo accounts.
  const [users, setUsers] = useState(() =>
    readStorage(USERS_KEY, [])
  );

  // Restore the current demo session after a refresh.
  const [user, setUser] = useState(() =>
    readStorage(SESSION_KEY, null)
  );

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  // Register a new student or teacher.
  function signup({ name, email, password, role }) {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      throw new Error("Enter your full name.");
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      throw new Error("Enter a valid email address.");
    }

    if (password.length < 8) {
      throw new Error(
        "Password must contain at least 8 characters."
      );
    }

    if (!["student", "teacher"].includes(role)) {
      throw new Error("Please select a valid role.");
    }

    const alreadyRegistered = users.some(
      (registeredUser) =>
        registeredUser.email === normalizedEmail
    );

    if (alreadyRegistered) {
      throw new Error(
        "This email is already registered. Please log in."
      );
    }

    // FRONTEND DEMO ONLY:
    // This stores a plain-text password and is NOT secure.
    // Use a backend with password hashing for a real system.
    const newUser = {
      id: `${role}-${Date.now()}`,
      name: normalizedName,
      email: normalizedEmail,
      password,
      role,
    };

    setUsers((currentUsers) => [
      ...currentUsers,
      newUser,
    ]);

    // Important: registration does not log the user in.
    return true;
  }

  // Authenticate an existing registered account.
  function login({ email, password, role }) {
    const normalizedEmail = email.trim().toLowerCase();

    const registeredUser = users.find(
      (account) =>
        account.email === normalizedEmail &&
        account.password === password &&
        account.role === role
    );

    if (!registeredUser) {
      throw new Error(
        "Invalid credentials or role. Please sign up first."
      );
    }

    // Do not put the password in the active session.
    const session = {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
      role: registeredUser.role,
    };

    setUser(session);

    return session;
  }

  // Clear the active session.
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}
