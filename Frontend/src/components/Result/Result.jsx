
import {
  ArrowLeft,
  CheckCircle2,
  CircleX,
  GraduationCap,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useExams } from "../../context/ExamContext";
import "./Result.css";

export default function Result() {
  const { resultId } = useParams();
  const { results, exams } = useExams();

  const result = results.find((item) => item.id === resultId);

  if (!result) {
    return (
      <main className="page-container result-page">
        <div className="empty-state">
          <h2>Result not found</h2>
          <p>
            This result may not exist in your browser's saved data.
          </p>
          <Link className="button button-primary" to="/student">
            Back to dashboard
          </Link>
        </div>
      </main>
    );
  }

  const percentage = Number(result.percentage) || 0;

  const exam = exams.find((item) => item.id === result.examId);

  const questions = exam?.questions || [];

  const answers = result.answers || {};

  const passed = percentage >= 40;

  function getSelectedAnswer(question, index) {
    const key = question.id ?? index;
    return answers[key];
  }

  return (
    <main className="page-container result-page">
      <Link to="/student" className="result-back-link">
        <ArrowLeft size={17} />
        Back to dashboard
      </Link>

      <section className="result-hero">
        <div className={`result-trophy ${passed ? "passed" : "failed"}`}>
          {passed ? (
            <Trophy size={38} />
          ) : (
            <GraduationCap size={38} />
          )}
        </div>

        <p className="eyebrow">EXAMINATION COMPLETED</p>

        <h1>
          {passed ? "Well done!" : "Keep practising!"}
        </h1>

        <p className="result-subtitle">
          You have completed <strong>{result.examTitle}</strong>.
          Here is your performance summary.
        </p>

        <div className="result-score-circle">
          <strong>{percentage}%</strong>
          <span>Overall score</span>
        </div>

        <span className={`result-status ${passed ? "pass" : "fail"}`}>
          {passed ? "Passed" : "Needs improvement"}
        </span>
      </section>

      <section className="result-stat-grid">
        <article className="result-stat-card">
          <span className="result-stat-icon score-icon">
            <Trophy size={22} />
          </span>
          <div>
            <p>Total score</p>
            <strong>
              {result.score} / {result.total}
            </strong>
          </div>
        </article>

        <article className="result-stat-card">
          <span className="result-stat-icon correct-icon">
            <CheckCircle2 size={22} />
          </span>
          <div>
            <p>Correct answers</p>
            <strong>{result.score}</strong>
          </div>
        </article>

        <article className="result-stat-card">
          <span className="result-stat-icon incorrect-icon">
            <CircleX size={22} />
          </span>
          <div>
            <p>Incorrect / unanswered</p>
            <strong>
              {Math.max(0, result.total - result.score)}
            </strong>
          </div>
        </article>
      </section>

      <section className="result-details-card">
        <div>
          <span>Student</span>
          <strong>{result.studentName}</strong>
        </div>

        <div>
          <span>Examination</span>
          <strong>{result.examTitle}</strong>
        </div>

        <div>
          <span>Submission date</span>
          <strong>
            {new Date(result.submittedAt).toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Passing requirement</span>
          <strong>40%</strong>
        </div>
      </section>

      {questions.length > 0 && (
        <section className="answer-review-section">
          <div className="result-section-heading">
            <div>
              <p className="eyebrow">DETAILED REVIEW</p>
              <h2>Review your answers</h2>
              <p>
                Compare your selected answers with the correct answers.
              </p>
            </div>
          </div>

          <div className="answer-review-list">
            {questions.map((question, index) => {
              const selected = getSelectedAnswer(question, index);
              const correct = question.correctIndex;
              const isCorrect = selected === correct;
              const wasAnswered = selected !== undefined;

              return (
                <article
                  className="answer-review-card"
                  key={question.id ?? index}
                >
                  <div className="answer-review-title">
                    <span className="review-question-number">
                      Question {index + 1}
                    </span>

                    <span
                      className={`review-result-badge ${
                        isCorrect ? "review-correct" : "review-incorrect"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        <CircleX size={15} />
                      )}
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <h3>{question.text}</h3>

                  <div className="review-answer-lines">
                    <p>
                      <span>Your answer:</span>{" "}
                      <strong
                        className={
                          isCorrect
                            ? "review-answer-good"
                            : "review-answer-bad"
                        }
                      >
                        {wasAnswered
                          ? question.options[selected] ??
                            "Invalid answer"
                          : "Not answered"}
                      </strong>
                    </p>

                    <p>
                      <span>Correct answer:</span>{" "}
                      <strong className="review-answer-good">
                        {question.options[correct] ??
                          "Answer unavailable"}
                      </strong>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <div className="result-actions">
        <Link
          to="/student"
          className="button button-secondary"
        >
          <ArrowLeft size={17} />
          Dashboard
        </Link>

        {exam && (
          <Link
            to={`/instructions/${exam.id}`}
            className="button button-primary"
          >
            <RotateCcw size={17} />
            Try again
          </Link>
        )}
      </div>
    </main>
  );
}
