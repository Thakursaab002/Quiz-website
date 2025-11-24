import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// AUTH PAGES
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";

// USER PAGES
import ProfilePage from "./components/ProfilePage";
import ProgressPage from "./components/ProgressPage";

// MAIN PAGES
import Homepage from './components/HomePage';
import Quiz from './components/Quiz';
import Flashcards from './components/Flashcards';
import Resources from './components/Resources';

import { getCurrentUser, logoutUser } from './authUtils';
import './App.css';

// Auth Context for global state management
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if user is logged in on app start
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    logoutUser();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Homepage />} />

            {/* AUTH */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* PROTECTED USER ROUTES */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/progress" 
              element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              } 
            />

            {/* MAIN FEATURES */}
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export { AuthContext };
export default App;