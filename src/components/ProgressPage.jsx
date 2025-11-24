import React from "react";
import { getProgress } from "../authUtils";
import { ArrowLeft, Trophy, Clock } from "lucide-react";

const ProgressPage = ({ goBack }) => {
  const progress = getProgress();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-20 w-80 h-80 bg-cyan-500/20 blur-[110px] rounded-full" />
        <div className="absolute bottom-0 right-20 w-80 h-80 bg-purple-500/20 blur-[110px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </button>

        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Trophy className="w-7 h-7 text-amber-300" />
          Quiz Progress
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Total quizzes: {progress.totalQuizzes} · Best score:{" "}
          <span className="text-emerald-300 font-semibold">
            {progress.bestScore}%
          </span>
        </p>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {progress.history.length === 0 && (
            <div className="rounded-2xl bg-slate-900/70 border border-slate-700 p-6 text-sm text-slate-400">
              No quiz attempts yet. Start a quiz to see your progress here.
            </div>
          )}

          {progress.history.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-700/80 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  {item.category} ·{" "}
                  <span className="text-cyan-300">{item.difficulty}</span>
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {item.date}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-emerald-300 font-semibold">
                  {item.score}/{item.total}{" "}
                  <span className="text-xs text-slate-400">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
