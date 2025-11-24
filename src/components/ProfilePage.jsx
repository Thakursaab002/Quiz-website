import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, CalendarDays, Trophy, BarChart2, LogOut } from "lucide-react";
import { getCurrentUser, getProgress, logoutUser } from "../authUtils"; // Change getUser to getCurrentUser
import { AuthContext } from "../App";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  const user = getCurrentUser(); // Change getUser to getCurrentUser
  const progress = getProgress();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <div className="text-center">
          <p className="mb-4">No user found. Please sign up or log in.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const joinedDate = new Date(user.joined).toLocaleDateString();

  const handleLogout = () => {
    logoutUser();
    logout();
    navigate("/");
  };

  const goToQuiz = () => {
    navigate("/quiz");
  };

  const goToProgress = () => {
    navigate("/progress");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-indigo-500/25 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-rose-300"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-[1.1fr,1.2fr] gap-6">
          {/* user card */}
          <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-bold text-slate-950">
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-300" />
                  {user.name}
                </p>
                <p className="text-sm text-slate-400 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays className="w-4 h-4 text-slate-500" />
              Joined on <span className="text-slate-200">{joinedDate}</span>
            </div>
          </div>

          {/* stats */}
          <div className="rounded-3xl bg-slate-900/70 border border-white/10 p-6 backdrop-blur-xl shadow-xl">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              Overall Progress
            </h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="rounded-2xl bg-slate-950/60 border border-slate-700/80 p-3 text-center">
                <p className="text-[11px] text-slate-400 mb-1 uppercase">Quizzes</p>
                <p className="text-xl font-bold text-cyan-300">
                  {progress.totalQuizzes}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 border border-slate-700/80 p-3 text-center">
                <p className="text-[11px] text-slate-400 mb-1 uppercase">Best Score</p>
                <p className="text-xl font-bold text-emerald-300">
                  {progress.bestScore}%
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/60 border border-slate-700/80 p-3 text-center">
                <p className="text-[11px] text-slate-400 mb-1 uppercase">Sessions</p>
                <p className="text-xl font-bold text-indigo-300">
                  {progress.history.length}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={goToQuiz}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-[1.02] transition-all"
              >
                <Trophy className="w-4 h-4" />
                Start New Quiz
              </button>
              <button
                onClick={goToProgress}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-600 text-sm font-semibold text-slate-100 hover:bg-slate-700/80 transition-all"
              >
                <BarChart2 className="w-4 h-4" />
                View Detailed Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;