
/* File: src/components/ExamPortal/Timer.jsx */

import { Clock3 } from "lucide-react";

export default function Timer({ secondsLeft }) {
  const safeSeconds = Math.max(0, secondsLeft);

  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  const format = (value) =>
    String(value).padStart(2, "0");

  return (
    <div
      className={`exam-timer ${
        safeSeconds < 60 ? "timer-warning" : ""
      }`}
      aria-live="off"
    >
      <Clock3 size={17} />

      <span>Time left :</span>

      <strong>
        {format(hours)}:{format(minutes)}:{format(seconds)}
      </strong>
    </div>
  );
}
