
import { useMemo } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  FileCheck2,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import { useExams } from "../../context/ExamContext";
import { useAuth } from "../../context/AuthContext";

import "./StudentDashboard.css";

export default function StudentDashboard() {
  const { exams, results } = useExams();
  const { user } = useAuth();

  const myResults = useMemo(
    () =>
      (results || []).filter(
        (result) => result.studentEmail === user?.email
      ),
    [results, user?.email]
  );

  const availableExams = (exams || []).filter(
    (exam) => exam.status === "Available"
  );

  const upcomingExams = (exams || []).filter(
    (exam) => exam.status === "Upcoming"
  );

  return (
    <div className="app-page">
      <Navbar subtitle="Student workspace" />

      <main className="page-content">
        {/* Welcome section */}
        <section className="welcome-row">
          <div>
            <span className="eyebrow">STUDENT OVERVIEW</span>

            <h1>
              Welcome back, {user?.name || "Student"}
            </h1>

            <p>Ready to put your knowledge to the test?</p>
          </div>

          <div className="welcome-icon">
            <GraduationCap size={28} />
          </div>
        </section>

        {/* Dashboard statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon blue">
              <BookOpenCheck size={20} />
            </span>

            <div>
              <small>Available exams</small>
              <strong>{availableExams.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon purple">
              <Clock3 size={20} />
            </span>

            <div>
              <small>Upcoming exams</small>
              <strong>{upcomingExams.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon green">
              <FileCheck2 size={20} />
            </span>

            <div>
              <small>Completed exams</small>
              <strong>{myResults.length}</strong>
            </div>
          </div>
        </section>

        {/* Available examinations */}
        <section className="section-heading">
          <div>
            <h2>Available exams</h2>
            <p>
              Select an exam to read the instructions and begin.
            </p>
          </div>
        </section>

        {availableExams.length > 0 ? (
          <div className="exam-grid">
            {availableExams.map((exam) => (
              <article className="exam-card" key={exam.id}>
                <div className="exam-card-top">
                  <span className="subject-tag">
                    {exam.subject || "General"}
                  </span>

                  <span className="status-pill available">
                    Available
                  </span>
                </div>

                <h3>{exam.title}</h3>

                <p className="exam-description">
                  {exam.description ||
                    "Review the instructions before starting this assessment."}
                </p>

                <div className="exam-meta">
                  <span>
                    <BookOpenCheck size={15} />
                    {exam.questions?.length || 0} questions
                  </span>

                  <span>
                    <Clock3 size={15} />
                    {exam.duration} min
                  </span>
                </div>

                <Link
                  className="exam-link"
                  to={`/instructions/${exam.id}`}
                >
                  Read instructions
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            No available exams right now.
          </div>
        )}

        {/* Upcoming examinations */}
        <section className="section-heading upcoming-heading">
          <div>
            <h2>Upcoming exams</h2>
            <p>These assessments are not open yet.</p>
          </div>
        </section>

        <div className="upcoming-list">
          {upcomingExams.length > 0 ? (
            upcomingExams.map((exam) => (
              <div className="upcoming-row" key={exam.id}>
                <div className="upcoming-file">
                  <BookOpenCheck size={19} />
                </div>

                <div className="upcoming-info">
                  <strong>{exam.title}</strong>

                  <span>
                    {exam.subject || "General"} ·{" "}
                    {exam.questions?.length || 0} questions
                  </span>
                </div>

                <span className="status-pill upcoming">
                  Coming soon
                </span>
              </div>
            ))
          ) : (
            <div className="empty-state compact">
              No upcoming exams.
            </div>
          )}
        </div>

        {/* Recent results */}
        <section
          id="results"
          className="section-heading upcoming-heading"
        >
          <div>
            <h2>Recent results</h2>
            <p>Your submitted assessments and scores.</p>
          </div>
        </section>

        <div className="results-list">
          {myResults.length > 0 ? (
            [...myResults]
              .sort(
                (a, b) =>
                  new Date(b.submittedAt) -
                  new Date(a.submittedAt)
              )
              .slice(0, 5)
              .map((result) => (
                <div className="result-row" key={result.id}>
                  <div>
                    <strong>{result.examTitle}</strong>

                    <span>
                      {new Date(
                        result.submittedAt
                      ).toLocaleString()}
                    </span>
                  </div>

                  <strong
                    className={
                      result.percentage >= 60
                        ? "score-pass"
                        : "score-low"
                    }
                  >
                    {result.percentage}%
                  </strong>

                  <Link to={`/result/${result.id}`}>
                    View result
                  </Link>
                </div>
              ))
          ) : (
            <div className="empty-state compact">
              Your results will appear here after you submit an exam.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
