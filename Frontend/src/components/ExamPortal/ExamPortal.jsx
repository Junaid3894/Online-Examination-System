
/* File: src/components/ExamPortal/ExamPortal.jsx */

import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useExams } from "../../context/ExamContext";
import Timer from "./Timer";
import QuestionPalette from "./QuestionPalette";
import "./ExamPortal.css";

export default function ExamPortal() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { exams, submitExam } = useExams();

  const exam = exams.find((item) => item.id === examId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const submittedRef = useRef(false);

  // Reset the exam state and use the selected exam's duration.
  useEffect(() => {
    if (!exam) return;

    submittedRef.current = false;
    setCurrentIndex(0);
    setAnswers({});
    setSecondsLeft(Math.max(1, Number(exam.duration) || 30) * 60);
    setStatuses(
      exam.questions.map((_, index) =>
        index === 0 ? "not-answered" : "not-visited"
      )
    );
  }, [examId, exam]);

  const finishExam = useCallback(() => {
    if (submittedRef.current || !exam || !user) return;

    submittedRef.current = true;

    try {
      const result = submitExam({
        exam,
        answers,
        student: user,
      });

      navigate(`/result/${result.id}`, { replace: true });
    } catch (error) {
      submittedRef.current = false;
      window.alert(error.message || "Exam submission failed.");
    }
  }, [exam, user, answers, submitExam, navigate]);

  // One countdown interval per selected exam.
  useEffect(() => {
    if (
      !exam ||
      secondsLeft === null ||
      secondsLeft <= 0 ||
      submittedRef.current
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((remaining) =>
        remaining === null ? null : Math.max(0, remaining - 1)
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [examId, exam, secondsLeft]);

  // Submit automatically when the countdown reaches zero.
  useEffect(() => {
    if (secondsLeft === 0 && exam && !submittedRef.current) {
      finishExam();
    }
  }, [secondsLeft, exam, finishExam]);

  function visitQuestion(index) {
    setCurrentIndex(index);

    setStatuses((current) =>
      current.map((status, i) =>
        i === index && status === "not-visited"
          ? "not-answered"
          : status
      )
    );
  }

  function selectAnswer(optionIndex) {
    setAnswers((current) => ({
      ...current,
      [currentIndex]: optionIndex,
    }));
  }

  function saveAndNext() {
    setStatuses((current) =>
      current.map((status, index) => {
        if (index !== currentIndex) return status;

        return answers[currentIndex] !== undefined
          ? "answered"
          : "not-answered";
      })
    );

    if (currentIndex < exam.questions.length - 1) {
      visitQuestion(currentIndex + 1);
    }
  }

  function markForReviewAndNext() {
    setStatuses((current) =>
      current.map((status, index) => {
        if (index !== currentIndex) return status;

        return answers[currentIndex] !== undefined
          ? "answered-marked"
          : "marked";
      })
    );

    if (currentIndex < exam.questions.length - 1) {
      visitQuestion(currentIndex + 1);
    }
  }

  function clearResponse() {
    setAnswers((current) => {
      const updated = { ...current };
      delete updated[currentIndex];
      return updated;
    });

    setStatuses((current) =>
      current.map((status, index) =>
        index === currentIndex ? "not-answered" : status
      )
    );
  }

  function requestSubmit() {
    const unanswered = exam.questions.length - Object.keys(answers).length;

    if (
      window.confirm(
        `Submit "${exam.title}"?\n\n` +
          `Answered: ${Object.keys(answers).length}/${exam.questions.length}\n` +
          `Unanswered: ${unanswered}`
      )
    ) {
      finishExam();
    }
  }

  if (!exam) {
    return (
      <main className="exam-unavailable">
        <h2>Exam not found</h2>
        <p>This exam may have been removed or the link is incorrect.</p>
        <button onClick={() => navigate("/student")}>
          Return to dashboard
        </button>
      </main>
    );
  }

  if (user?.role !== "student") {
    return <Navigate to="/" replace />;
  }

  const question = exam.questions[currentIndex];

  if (!question || secondsLeft === null) {
    return <div className="exam-loading">Loading exam...</div>;
  }

  return (
    <main className="exam-screen">
      <header className="exam-topbar">
        <strong className="exam-name">{exam.title}</strong>

        <div className="exam-top-links">
          <span>Question Paper</span>
          <button
            type="button"
            onClick={() => window.alert("Report Error is not implemented yet.")}
          >
            Report Error
          </button>
        </div>
      </header>

      <div className="exam-workspace">
        <section className="exam-main-column">
          <div className="exam-meta-bar">
            <Timer secondsLeft={secondsLeft} />

            <div className="marking-info">
              Marks for correct response: <strong>1.00</strong>
              <span>|</span>
              Negative marking: <strong>0.00</strong>
            </div>
          </div>

          <section className="exam-question-area">
            <h2 className="question-title">
              Question No. {currentIndex + 1}
            </h2>

            <div className="question-body">
              <p className="question-text">{question.text}</p>

              <div className="exam-options">
                {question.options.map((option, index) => (
                  <label
                    className={`exam-option ${
                      answers[currentIndex] === index
                        ? "exam-option-selected"
                        : ""
                    }`}
                    key={`${question.id}-${index}`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentIndex}`}
                      checked={answers[currentIndex] === index}
                      onChange={() => selectAnswer(index)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <footer className="exam-bottom-bar">
            <div className="exam-bottom-left">
              <button
                className="review-next-button"
                onClick={markForReviewAndNext}
              >
                Mark for Review &amp; Next
              </button>

              <button
                className="clear-response-button"
                onClick={clearResponse}
              >
                Clear Response
              </button>
            </div>

            <button
              className="save-next-button"
              onClick={saveAndNext}
              disabled={currentIndex === exam.questions.length - 1}
            >
              Save &amp; Next
            </button>
          </footer>
        </section>

        <QuestionPalette
          studentName={user.name}
          questions={exam.questions}
          currentIndex={currentIndex}
          statuses={statuses}
          onSelectQuestion={visitQuestion}
          onSubmit={requestSubmit}
        />
      </div>
    </main>
  );
}
