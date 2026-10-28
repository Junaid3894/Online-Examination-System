
/* File: src/components/ExamPortal/Instructions.jsx */

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Info } from "lucide-react";
import "./Instructions.css";

function StatusSymbol({ type, children }) {
  return (
    <span className={`instruction-symbol ${type}`}>
      {children}
    </span>
  );
}

export default function Instructions() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [error, setError] = useState("");

  async function handleStart() {
    setError("");

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      setError("Fullscreen unavailable. Continuing without fullscreen.");
    }

    navigate(`/exam/${examId}`);
  }

  return (
    <main className="instructions-page">
      <div className="instructions-scroll">
        <h1 className="instructions-title">
          <Info size={22} />
          Instructions
        </h1>

        <h3 className="instructions-heading">
          General Instructions:
        </h3>

        <ol className="instructions-list">
          <li>
            The Question Palette displayed on the right side
            shows the status of each question.

            <div className="symbol-examples">
              <div className="symbol-row">
                <StatusSymbol type="not-visited">1</StatusSymbol>
                <span>You have not visited the question yet.</span>
              </div>

              <div className="symbol-row">
                <StatusSymbol type="not-answered">3</StatusSymbol>
                <span>You have not answered the question.</span>
              </div>

              <div className="symbol-row">
                <StatusSymbol type="answered">5</StatusSymbol>
                <span>You have answered the question.</span>
              </div>

              <div className="symbol-row">
                <StatusSymbol type="marked">7</StatusSymbol>
                <span>
                  You have not answered the question but marked it
                  for review.
                </span>
              </div>

              <div className="symbol-row">
                <StatusSymbol type="answered-marked">
                  9<i>✓</i>
                </StatusSymbol>
                <span>
                  You have answered the question and marked it
                  for review.
                </span>
              </div>
            </div>
          </li>

          <li className="instruction-warning">
            Marked for Review indicates that you want to revisit
            a question.{" "}
            <em>
              If a question is answered and marked for review,
              your answer will still be considered for evaluation.
            </em>
          </li>
        </ol>

        <h3 className="instructions-heading">
          Navigating to a Question:
        </h3>

        <ol className="instructions-list" start={3}>
          <li>
            To answer questions:

            <ol type="a" className="sub-instructions">
              <li>
                Click a question number in the palette to open it.
              </li>
              <li>
                Click <strong>Save &amp; Next</strong> to save your
                response and move forward.
              </li>
              <li>
                Click <strong>Mark for Review &amp; Next</strong> to
                flag a question and move forward.
              </li>
            </ol>
          </li>

          <li>
            Use <strong>Clear Response</strong> to remove your
            selected option.
          </li>

          <li>
            Your countdown duration depends on the selected exam.
          </li>

          <li>
            The exam will submit automatically when the timer
            reaches zero.
          </li>

          <li>
            Click Submit when you have finished. Confirm submission
            to view your result.
          </li>
        </ol>
      </div>

      <footer className="instructions-footer">
        {error && <p role="status">{error}</p>}

        <button type="button" onClick={handleStart}>
          Start
        </button>
      </footer>
    </main>
  );
}
