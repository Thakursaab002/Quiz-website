import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, CalendarDays, Trophy, BarChart2, LogOut, Sparkles, Zap, History } from "lucide-react";
import { getCurrentUser, getProgress, logoutUser } from "../authUtils";
import { AuthContext } from "../App";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  
  const user = getCurrentUser();
  const progress = getProgress();

  // Redirect or Show Login if no user
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
        <div className="z-10 text-center animate-slide-up bg-slate-900/50 p-8 rounded-3xl border border-white/10 backdrop-blur-md">
          <p className="mb-6 text-lg text-slate-400">Session expired or no user found.</p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-1"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const joinedDate = new Date(user.joined).toLocaleDateString(undefined, { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });

  const handleLogout = () => {
    logoutUser();
    logout();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-hidden flex items-center justify-center p-4">
      
      {/* --- Background Effects --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        {/* Floating Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-5s' }} />
      </div>

      {/* --- Main Dashboard Container --- */}
      <div className="relative z-10 w-full max-w-5xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Dashboard
            </h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              Welcome back, Commander <Sparkles className="w-4 h-4 text-yellow-400" />
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/50 border border-white/10 text-sm font-medium text-slate-400 hover:text-white hover:bg-rose-500/10 hover:border-rose-500/50 transition-all duration-300 backdrop-blur-md"
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Sign Out
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* --- LEFT COLUMN: Profile Card (Span 5) --- */}
          <div 
            className="lg:col-span-5 flex flex-col h-full animate-slide-up" 
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-slate-900/40 border border-white/10 backdrop-blur-2xl p-8 flex flex-col items-center text-center shadow-2xl transition-all duration-500 hover:shadow-cyan-500/10 hover:border-white/20">
              
              {/* Decorative Background inside card */}
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent" />
              
              {/* Avatar */}
              <div className="relative mb-6 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative w-28 h-28 rounded-full bg-slate-950 flex items-center justify-center border-4 border-slate-900 text-5xl font-bold text-white shadow-xl">
                   {user.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 border-4 border-slate-900 rounded-full" title="Online" />
              </div>

              {/* User Info */}
              <h2 className="text-3xl font-bold text-white mb-1">{user.name}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-white/5 text-sm text-slate-400 mb-8">
                <Mail className="w-3.5 h-3.5" />
                {user.email}
              </div>

              {/* Details Grid */}
              <div className="w-full grid grid-cols-1 gap-4 mt-auto">
                <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover:text-cyan-400 transition-colors">
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Joined</p>
                      <p className="text-sm text-slate-200">{joinedDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 flex items-center justify-between group hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover:text-purple-400 transition-colors">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Status</p>
                      <p className="text-sm text-slate-200">Active Learner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Stats & Actions (Span 7) --- */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <StatCard 
                icon={<Trophy className="w-6 h-6 text-yellow-400" />} 
                label="Quizzes Taken" 
                value={progress.totalQuizzes} 
                color="from-yellow-400/20 to-orange-500/5"
              />
              <StatCard 
                icon={<Sparkles className="w-6 h-6 text-emerald-400" />} 
                label="Best Score" 
                value={`${progress.bestScore}%`} 
                color="from-emerald-400/20 to-teal-500/5"
              />
              <StatCard 
                icon={<History className="w-6 h-6 text-blue-400" />} 
                label="Sessions" 
                value={progress.history.length} 
                color="from-blue-400/20 to-indigo-500/5"
                className="col-span-2 sm:col-span-1"
              />
            </div>

            {/* Main Action Card */}
            <div 
              className="flex-1 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/10 backdrop-blur-2xl p-8 flex flex-col justify-center gap-6 shadow-2xl animate-slide-up relative overflow-hidden group"
              style={{ animationDelay: '0.4s' }}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-700" />

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready for a Challenge?</h3>
                <p className="text-slate-400 max-w-md">
                  Test your knowledge and improve your score. New questions are waiting for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/quiz")}
                  className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5" /> Start New Quiz
                  </span>
                </button>

                <button
                  onClick={() => navigate("/progress")}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-700 hover:border-slate-600 hover:text-white transition-all duration-300"
                >
                  <BarChart2 className="w-5 h-5" /> View Analytics
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Stats to keep code clean
const StatCard = ({ icon, label, value, color, className = "" }) => (
  <div className={`relative overflow-hidden rounded-3xl bg-slate-900/60 border border-white/5 p-6 backdrop-blur-md hover:-translate-y-1 transition-transform duration-300 ${className}`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 hover:opacity-100 transition-opacity duration-500`} />
    <div className="relative z-10">
      <div className="mb-4 p-3 bg-slate-950/50 rounded-2xl w-fit border border-white/5">
        {icon}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  </div>
);

export default ProfilePage;