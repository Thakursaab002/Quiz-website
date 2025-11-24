import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, Trophy, Zap, Star, Sparkles, Target, ChevronDown, 
  Play, Users, Clock, Award, Settings, HelpCircle, LogOut,
  BarChart3, GamepadIcon, Timer, Crown, Medal, TrendingUp,
  BookOpen, User, Home
} from 'lucide-react';

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-900" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      
      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      
      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home', path: '/' },
    { id: 'quiz', icon: Play, label: 'Quiz', path: '/quiz' },
    { id: 'flashcards', icon: BookOpen, label: 'Flashcards', path: '/flashcards' },
    { id: 'progress', icon: BarChart3, label: 'Progress', path: '/progress' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <Brain className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 group-hover:rotate-12" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              StudyHub
            </span>
          </Link>
          
          {/* Navigation Items */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800/50 rounded-2xl p-1 backdrop-blur-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            >
              Login
            </Link>
            
            <Link 
              to="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Scroll Indicator Component
const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-gray-400 text-sm">Scroll to explore</span>
      <ChevronDown className="w-6 h-6 text-cyan-400" />
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-700 hover:scale-105 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {Icon && <Icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

// Portal Card Component
const PortalCard = ({ icon: Icon, title, description, path, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  return (
    <Link
      to={path}
      ref={ref}
      className={`group relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-700 hover:scale-105 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 block ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            {Icon && <Icon className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />}
          </div>
          
          <div className="text-2xl opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-cyan-400">
            →
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1, ...options });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  return [ref, isVisible];
};

// Footer Component
const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                StudyHub
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Your ultimate learning companion. Master any subject with interactive quizzes, 
              smart flashcards, and detailed progress tracking.
            </p>
            <div className="flex gap-4 mt-6">
              {['🚀', '⭐', '💫', '🌌'].map((icon, index) => (
                <div 
                  key={index} 
                  className="text-2xl opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Platform</h3>
            <div className="space-y-3">
              {[
                { name: 'Quiz Portal', path: '/quiz' },
                { name: 'Flashcards', path: '/flashcards' },
                { name: 'Progress', path: '/progress' },
                { name: 'Profile', path: '/profile' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Account</h3>
            <div className="space-y-3">
              {[
                { name: 'Login', path: '/login' },
                { name: 'Sign Up', path: '/signup' },
                { name: 'Settings', path: '/settings' },
                { name: 'Help Center', path: '/help' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-400 hover:text-blue-400 transition-colors duration-300 text-lg hover:translate-x-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-lg">
            © 2025 StudyHub. Made with 💙 for learners.
          </p>
          
          <div className="flex items-center gap-8 text-gray-400 text-lg">
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors duration-300">Privacy</Link>
            <Link to="/terms" className="hover:text-cyan-400 transition-colors duration-300">Terms</Link>
            <Link to="/contact" className="hover:text-cyan-400 transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main HomePage Component
const HomePage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  
  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">AI-Powered Learning Platform</span>
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              MASTER
            </span>
            <br />
            <span className="text-white">ANY SUBJECT</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Transform your learning experience with interactive quizzes, smart flashcards, 
            and personalized progress tracking powered by modern technology.
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-600 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/quiz"
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-3"
            >
              <Play className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              Start Quiz
              <Zap className="w-5 h-5" />
            </Link>
            
            <Link
              to="/flashcards"
              className="group px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3"
            >
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Explore Flashcards
            </Link>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>
      
      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Learning Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Smart Quizzes"
              description="Adaptive quizzes that adjust to your learning level and help you improve faster."
              delay={0}
            />
            <FeatureCard
              icon={BookOpen}
              title="Digital Flashcards"
              description="Create and study with smart flashcards that use spaced repetition for better retention."
              delay={100}
            />
            <FeatureCard
              icon={BarChart3}
              title="Progress Tracking"
              description="Detailed analytics and insights to track your improvement across all subjects."
              delay={200}
            />
            <FeatureCard
              icon={Target}
              title="Goal Setting"
              description="Set learning goals and milestones to stay motivated and organized."
              delay={0}
            />
            <FeatureCard
              icon={Trophy}
              title="Achievements"
              description="Earn badges and rewards as you progress through your learning journey."
              delay={100}
            />
            <FeatureCard
              icon={User}
              title="Personal Profile"
              description="Manage your account, track your stats, and customize your learning experience."
              delay={200}
            />
          </div>
        </div>
      </section>
      
      {/* Portal Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Learning Portals
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose your learning path and start your journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PortalCard
              icon={Play}
              title="Quiz Portal"
              description="Test your knowledge with interactive quizzes across various subjects and difficulty levels."
              path="/quiz"
              delay={0}
            />
            <PortalCard
              icon={BookOpen}
              title="Flashcards"
              description="Master key concepts with smart flashcards and spaced repetition techniques."
              path="/flashcards"
              delay={100}
            />
            <PortalCard
              icon={BarChart3}
              title="Progress Hub"
              description="Track your learning journey with detailed analytics and performance insights."
              path="/progress"
              delay={200}
            />
            <PortalCard
              icon={User}
              title="Profile"
              description="Manage your account, view your achievements, and customize settings."
              path="/profile"
              delay={0}
            />
            <PortalCard
              icon={LogOut}
              title="Login"
              description="Access your personalized learning dashboard and continue your progress."
              path="/login"
              delay={100}
            />
            <PortalCard
              icon={Award}
              title="Sign Up"
              description="Join our learning community and start your educational journey today."
              path="/signup"
              delay={200}
            />
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <Star className="w-16 h-16 text-cyan-400 mx-auto mb-8 animate-pulse" />
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Learn?
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of learners and start your educational journey today.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-3"
                >
                  Get Started Free
                  <Sparkles className="w-6 h-6" />
                </Link>
                
                <Link
                  to="/quiz"
                  className="px-8 py-5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3"
                >
                  Try Demo Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(15px) translateX(-15px); }
          66% { transform: translateY(-15px) translateX(15px); }
        }
        
        @keyframes particle {
          0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px) scale(0.5); opacity: 0; }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle 20s linear infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;