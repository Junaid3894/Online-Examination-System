
/* File: src/context/ExamContext.jsx */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { defaultExams } from "../data/defaultExams";

const ExamContext = createContext(null);

const EXAMS_KEY = "examflow_exams";
const RESULTS_KEY = "examflow_results";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function initializeExams() {
  const savedExams = readStorage(EXAMS_KEY, []);

  // Keep default exams current and retain teacher-created exams.
  const savedById = new Map(
    savedExams.map((exam) => [exam.id, exam])
  );

  const defaults = defaultExams.map((exam) => ({
    ...exam,
    ...savedById.get(exam.id),
    questions: exam.questions,
  }));

  const customExams = savedExams.filter(
    (exam) =>
      !defaultExams.some((defaultExam) => defaultExam.id === exam.id)
  );

  return [...defaults, ...customExams];
}

export function ExamProvider({ children }) {
  const [exams, setExams] = useState(initializeExams);
  const [results, setResults] = useState(() =>
    readStorage(RESULTS_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  }, [results]);

  function createExam(exam) {
    const newExam = {
      ...exam,
      id: `exam-${Date.now()}`,
      status: exam.status || "Available",
      duration: Number(exam.duration) || 30,
      questions: (exam.questions || []).map((question, index) => ({
        ...question,
        id: question.id || `custom-q-${index + 1}`,
        correctIndex: Number(question.correctIndex),
      })),
    };

    setExams((current) => [newExam, ...current]);
    return newExam;
  }

  function submitExam({ exam, answers, student }) {
    const details = exam.questions.map((question, index) => {
      const selectedIndex =
        answers[index] === undefined ? null : answers[index];

      return {
        question: question.text,
        options: question.options,
        selectedIndex,
        selectedText:
          selectedIndex === null
            ? null
            : question.options[selectedIndex],
        correctIndex: question.correctIndex,
        correctText: question.options[question.correctIndex],
        isCorrect: selectedIndex === question.correctIndex,
      };
    });

    const correct = details.filter(
      (item) => item.isCorrect
    ).length;

    const incorrect = details.filter(
      (item) =>
        item.selectedIndex !== null && !item.isCorrect
    ).length;

    const unanswered = details.filter(
      (item) => item.selectedIndex === null
    ).length;

    const total = details.length;

    const result = {
      id: `result-${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      studentName: student.name,
      studentEmail: student.email,
      total,
      correct,
      incorrect,
      unanswered,
      percentage: total
        ? Math.round((correct / total) * 100)
        : 0,
      submittedAt: new Date().toISOString(),
      details,
    };

    setResults((current) => [result, ...current]);
    return result;
  }

  return (
    <ExamContext.Provider
      value={{
        exams,
        results,
        createExam,
        submitExam,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExams() {
  const context = useContext(ExamContext);

  if (!context) {
    throw new Error(
      "useExams must be used inside ExamProvider."
    );
  }

  return context;
}
