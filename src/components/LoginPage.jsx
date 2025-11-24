import React, { useState, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, CheckCircle, Star } from "lucide-react";
import { getUsers, setCurrentUser } from "../authUtils";
import { AuthContext } from "../App";

// Success Popup Component
const SuccessPopup = ({ message }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" />
    <div className="relative bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl shadow-2xl transform scale-100 animate-[bounceIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)] max-w-sm w-full text-center">
      <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400">
        <CheckCircle size={32} strokeWidth={3} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
      <p className="text-slate-400">{message}</p>
    </div>
  </div>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // 3D Tilt Logic
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -4; 
    const rotateY = ((x - centerX) / centerX) * 4;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Check credentials against stored users
    const allUsers = getUsers();
    const user = allUsers.find(u => u.email === email && u.password === password);

    setTimeout(() => {
      setIsLoading(false);
      
      if (user) {
        setCurrentUser(user);
        login(user);
        setShowSuccess(true);
        
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/profile");
        }, 1800);
      } else {
        setError("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <>
      {showSuccess && <SuccessPopup message="Login successful! Redirecting to your dashboard..." />}
      
      <div className="min-h-screen flex items-center justify-center bg-[#0F1221] relative overflow-hidden font-sans selection:bg-blue-500/30">
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
          className="relative z-10 w-full max-w-[420px] transition-transform duration-200 ease-out"
        >
          <div className="bg-[#1a1f35]/60 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-[2rem] shadow-[0_0_60px_-15px_rgba(0,0,0,0.5)]">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
                <Star className="text-white fill-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">StudyHub</h1>
              <p className="text-slate-400 text-sm">Welcome back to your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="block w-full pl-11 pr-4 py-3.5 bg-[#131625] border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    className="block w-full pl-11 pr-4 py-3.5 bg-[#131625] border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-400" />
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer hover:text-slate-300 transition-colors">
                  <input type="checkbox" className="rounded border-slate-700 bg-[#131625] text-blue-500 focus:ring-offset-0 focus:ring-blue-500/50" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="hover:text-blue-400 transition-colors">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 offset-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-100 group-hover:opacity-100 transition-opacity animate-gradient-xy" />
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="font-semibold text-sm tracking-wide">Log In</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <div className="mt-8 text-center text-xs text-slate-500">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global Animations Style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-gradient-xy {
            background-size: 200% 200%;
            animation: gradient-xy 6s ease infinite;
        }
        @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
};

export default LoginPage;