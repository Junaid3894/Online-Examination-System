
/* File: src/components/ExamPortal/QuestionPalette.jsx */

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  UserRound,
} from "lucide-react";

export default function QuestionPalette({
  studentName,
  questions,
  currentIndex,
  statuses,
  onSelectQuestion,
  onSubmit,
}) {
  const [collapsed, setCollapsed] = useState(false);

  const counts = {
    answered: statuses.filter((s) => s === "answered").length,
    notAnswered: statuses.filter((s) => s === "not-answered").length,
    notVisited: statuses.filter((s) => s === "not-visited").length,
    marked: statuses.filter((s) => s === "marked").length,
    answeredMarked: statuses.filter(
      (s) => s === "answered-marked"
    ).length,
  };

  return (
    <aside
      className={`palette-panel ${
        collapsed ? "palette-collapsed" : ""
      }`}
    >
      <button
        type="button"
        className="palette-collapse"
        onClick={() => setCollapsed((value) => !value)}
        aria-label={
          collapsed ? "Expand question palette" : "Collapse question palette"
        }
      >
        {collapsed ? (
          <ChevronLeft size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button>

      {!collapsed && (
        <>
          <div className="palette-profile">
            <span className="profile-icon">
              <UserRound size={22} />
            </span>
            <strong>{studentName || "Student"}</strong>
          </div>

          <div className="palette-legend">
            <div>
              <span className="legend-symbol answered">0</span>
              <span>Answered <b>{counts.answered}</b></span>
            </div>

            <div>
              <span className="legend-symbol not-answered">0</span>
              <span>Not Answered <b>{counts.notAnswered}</b></span>
            </div>

            <div>
              <span className="legend-symbol not-visited">0</span>
              <span>Not Visited <b>{counts.notVisited}</b></span>
            </div>

            <div>
              <span className="legend-symbol marked">0</span>
              <span>Marked for Review <b>{counts.marked}</b></span>
            </div>

            <div className="legend-wide">
              <span className="legend-symbol answered-marked">
                0<i>✓</i>
              </span>
              <span>
                Answered &amp; Marked for Review
                <b>{counts.answeredMarked}</b>
                <small>Will be considered for evaluation</small>
              </span>
            </div>
          </div>

          <h3 className="palette-heading">Choose a Question</h3>

          <div className="palette-question-grid">
            {questions.map((question, index) => (
              <button
                key={question.id ?? index}
                type="button"
                className={`palette-question ${statuses[index]} ${
                  currentIndex === index ? "current-question" : ""
                }`}
                onClick={() => onSelectQuestion(index)}
                aria-label={`Question ${index + 1}, ${
                  statuses[index]
                }`}
                aria-current={
                  currentIndex === index ? "step" : undefined
                }
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="palette-submit"
            onClick={onSubmit}
          >
            Submit
          </button>
        </>
      )}
    </aside>
  );
}
