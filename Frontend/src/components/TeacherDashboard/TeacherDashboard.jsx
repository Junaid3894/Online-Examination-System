
import { useState } from "react";
import {
  BookOpenCheck,
  Plus,
  Users,
  FileCheck2,
  Clock3,
  Trash2,
  X,
} from "lucide-react";
import Navbar from "../Navbar/Navbar";
import { useExams } from "../../context/ExamContext";
import "./TeacherDashboard.css";

const createEmptyQuestion = () => ({
  text: "",
  options: ["", "", "", ""],
  correctIndex: 0,
});

export default function TeacherDashboard() {
  const { exams = [], results = [], createExam } = useExams();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("30");
  const [questions, setQuestions] = useState([createEmptyQuestion()]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const uniqueStudents = new Set(
    results.map((result) => result.studentEmail).filter(Boolean)
  ).size;

  function resetForm() {
    setTitle("");
    setDescription("");
    setDuration("30");
    setQuestions([createEmptyQuestion()]);
    setError("");
    setShowForm(false);
  }

  function updateQuestion(questionIndex, field, value) {
    setQuestions((previous) =>
      previous.map((question, index) =>
        index === questionIndex
          ? { ...question, [field]: value }
          : question
      )
    );
  }

  function updateOption(questionIndex, optionIndex, value) {
    setQuestions((previous) =>
      previous.map((question, index) => {
        if (index !== questionIndex) return question;

        const options = [...question.options];
        options[optionIndex] = value;

        return { ...question, options };
      })
    );
  }

  function addQuestion() {
    setQuestions((previous) => [
      ...previous,
      createEmptyQuestion(),
    ]);
    setError("");
  }

  function removeQuestion(questionIndex) {
    setQuestions((previous) =>
      previous.filter((_, index) => index !== questionIndex)
    );
    setError("");
  }

  function handleCreateExam(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter an examination title.");
      return;
    }

    if (questions.length === 0) {
      setError("Please add at least one question.");
      return;
    }

    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];

      if (!question.text.trim()) {
        setError(
          `Please enter the text for question ${index + 1}.`
        );
        return;
      }

      if (question.options.some((option) => !option.trim())) {
        setError(
          `Please fill in all four options for question ${index + 1}.`
        );
        return;
      }

      const normalizedOptions = question.options.map((option) =>
        option.trim().toLowerCase()
      );

      if (
        new Set(normalizedOptions).size !==
        normalizedOptions.length
      ) {
        setError(
          `Question ${index + 1} contains duplicate options.`
        );
        return;
      }
    }

    const newExam = {
      id: `custom-${Date.now()}`,
      title: trimmedTitle,
      description: description.trim(),
      duration: Number(duration),
      status: "Available",
      subject: "General",
      questions: questions.map((question, index) => ({
        id: `q-${Date.now()}-${index}`,
        text: question.text.trim(),
        options: question.options.map((option) => option.trim()),
        correctIndex: Number(question.correctIndex),
      })),
    };

    try {
      createExam(newExam);
      setSuccess(`"${trimmedTitle}" was created successfully.`);
      resetForm();
    } catch (creationError) {
      console.error("Unable to create examination:", creationError);
      setError(
        "The examination could not be saved. Please try again."
      );
    }
  }

  return (
    <div className="app-page">
      <Navbar subtitle="Teacher workspace" />

      <main className="page-container teacher-page">
        {/* Teacher welcome */}
        <section className="teacher-welcome">
          <div>
            <p className="eyebrow">TEACHER WORKSPACE</p>
            <h1>Examination management</h1>
            <p>
              Create examinations, manage assessments, and review
              student performance.
            </p>
          </div>

          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setError("");
              setSuccess("");
              setShowForm(true);
            }}
          >
            <Plus size={18} />
            Create examination
          </button>
        </section>

        {/* Success notification */}
        {success && (
          <div className="teacher-alert success-alert" role="status">
            <span>{success}</span>
            <button
              type="button"
              onClick={() => setSuccess("")}
              aria-label="Dismiss success message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <section className="teacher-stat-grid">
          <article className="teacher-stat-card">
            <span className="teacher-stat-icon purple">
              <BookOpenCheck size={23} />
            </span>
            <div>
              <p>Total examinations</p>
              <strong>{exams.length}</strong>
            </div>
          </article>

          <article className="teacher-stat-card">
            <span className="teacher-stat-icon blue">
              <Users size={23} />
            </span>
            <div>
              <p>Students participated</p>
              <strong>{uniqueStudents}</strong>
            </div>
          </article>

          <article className="teacher-stat-card">
            <span className="teacher-stat-icon green">
              <FileCheck2 size={23} />
            </span>
            <div>
              <p>Submissions received</p>
              <strong>{results.length}</strong>
            </div>
          </article>
        </section>

        {/* Create examination form */}
        {showForm && (
          <section
            className="teacher-form-card"
            id="create-exam-form"
          >
            <div className="teacher-form-heading">
              <div>
                <p className="eyebrow">NEW ASSESSMENT</p>
                <h2>Create examination</h2>
                <p>
                  Enter the examination details and add your questions.
                </p>
              </div>

              <button
                type="button"
                className="teacher-close-button"
                onClick={resetForm}
                aria-label="Close examination form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleCreateExam}>
              <div className="teacher-form-grid">
                <label className="teacher-field">
                  Examination title
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="e.g. Java Programming Test"
                    required
                  />
                </label>

                <label className="teacher-field">
                  Duration
                  <select
                    value={duration}
                    onChange={(event) =>
                      setDuration(event.target.value)
                    }
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </label>

                <label className="teacher-field full-width-field">
                  Description
                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Describe this examination..."
                    rows={3}
                  />
                </label>
              </div>

              <div className="teacher-questions-heading">
                <div>
                  <h3>Questions and answers</h3>
                  <p>
                    Enter four options and select the correct answer for
                    each question.
                  </p>
                </div>

                <span>{questions.length} questions</span>
              </div>

              <div className="teacher-question-list">
                {questions.map((question, questionIndex) => (
                  <article
                    className="teacher-question-editor"
                    key={questionIndex}
                  >
                    <div className="teacher-question-editor-heading">
                      <h4>Question {questionIndex + 1}</h4>

                      {questions.length > 1 && (
                        <button
                          type="button"
                          className="remove-question-button"
                          onClick={() =>
                            removeQuestion(questionIndex)
                          }
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>

                    <label className="teacher-field">
                      Question text
                      <textarea
                        value={question.text}
                        onChange={(event) =>
                          updateQuestion(
                            questionIndex,
                            "text",
                            event.target.value
                          )
                        }
                        placeholder="Enter your question..."
                        rows={2}
                        required
                      />
                    </label>

                    <div className="teacher-options-grid">
                      {question.options.map((option, optionIndex) => (
                        <label
                          className="teacher-field"
                          key={optionIndex}
                        >
                          Option {String.fromCharCode(65 + optionIndex)}
                          <input
                            type="text"
                            value={option}
                            onChange={(event) =>
                              updateOption(
                                questionIndex,
                                optionIndex,
                                event.target.value
                              )
                            }
                            placeholder={`Enter option ${String.fromCharCode(
                              65 + optionIndex
                            )}`}
                            required
                          />
                        </label>
                      ))}
                    </div>

                    <label className="teacher-field correct-answer-field">
                      Correct answer
                      <select
                        value={question.correctIndex}
                        onChange={(event) =>
                          updateQuestion(
                            questionIndex,
                            "correctIndex",
                            Number(event.target.value)
                          )
                        }
                      >
                        {question.options.map((option, optionIndex) => (
                          <option
                            key={optionIndex}
                            value={optionIndex}
                          >
                            {String.fromCharCode(65 + optionIndex)}
                            {option.trim() ? ` — ${option}` : ""}
                          </option>
                        ))}
                      </select>
                    </label>
                  </article>
                ))}
              </div>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <div className="teacher-form-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={addQuestion}
                >
                  <Plus size={17} />
                  Add question
                </button>

                <div>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="button button-primary"
                  >
                    Create examination
                  </button>
                </div>
              </div>
            </form>
          </section>
        )}

        {/* Published examination library */}
        <section
          id="published-exams"
          className="teacher-section"
        >
          <div className="teacher-section-heading">
            <div>
              <p className="eyebrow">ASSESSMENT LIBRARY</p>
              <h2>All examinations</h2>
            </div>
            <span>{exams.length} total</span>
          </div>

          {exams.length > 0 ? (
            <div className="teacher-exam-grid">
              {exams.map((exam) => (
                <article
                  className="teacher-exam-card"
                  key={exam.id}
                >
                  <div className="teacher-exam-card-top">
                    <span className="teacher-exam-icon">
                      <BookOpenCheck size={22} />
                    </span>

                    <span
                      className={`teacher-exam-status ${
                        exam.status === "Available"
                          ? "available-status"
                          : "unavailable-status"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>

                  <h3>{exam.title}</h3>
                  <p>
                    {exam.description || "No description provided."}
                  </p>

                  <div className="teacher-exam-meta">
                    <span>
                      <Clock3 size={15} />
                      {exam.duration} min
                    </span>

                    <span>
                      <FileCheck2 size={15} />
                      {exam.questions?.length || 0} questions
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              No examinations have been created yet.
            </div>
          )}
        </section>

        {/* Recent student submissions */}
        <section className="teacher-section">
          <div className="teacher-section-heading">
            <div>
              <p className="eyebrow">STUDENT PERFORMANCE</p>
              <h2>Recent submissions</h2>
            </div>
            <span>{results.length} submissions</span>
          </div>

          {results.length > 0 ? (
            <div className="teacher-results-table-wrap">
              <table className="teacher-results-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Examination</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Submitted</th>
                  </tr>
                </thead>

                <tbody>
                  {[...results]
                    .sort(
                      (a, b) =>
                        new Date(b.submittedAt) -
                        new Date(a.submittedAt)
                    )
                    .map((result) => (
                      <tr key={result.id}>
                        <td>
                          <strong>{result.studentName}</strong>
                          <small>{result.studentEmail}</small>
                        </td>

                        <td>{result.examTitle}</td>

                        <td>
                          {result.score}/{result.total}
                        </td>

                        <td>
                          <span
                            className={`teacher-score-pill ${
                              result.percentage >= 40
                                ? "teacher-pass"
                                : "teacher-fail"
                            }`}
                          >
                            {result.percentage}%
                          </span>
                        </td>

                        <td>
                          {new Date(
                            result.submittedAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              Student submissions will appear here after an exam is
              completed.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
