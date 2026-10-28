
/* File: src/App.jsx */

import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login/Login";
import Instructions from "./components/ExamPortal/Instructions";
import ExamPortal from "./components/ExamPortal/ExamPortal";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import Result from "./components/Result/Result";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { useAuth } from "./context/AuthContext";

function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate
      to={user.role === "teacher" ? "/teacher" : "/student"}
      replace
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route
          path="/instructions/:examId"
          element={<Instructions />}
        />
        <Route path="/exam/:examId" element={<ExamPortal />} />
        <Route path="/result/:resultId" element={<Result />} />
      </Route>

      <Route element={<ProtectedRoute role="teacher" />}>
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
