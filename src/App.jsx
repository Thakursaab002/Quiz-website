import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import './App.css';

const App = () => {
  const [quizState, setQuizState] = useState('start'); // 'start', 'quiz', 'results'
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  // Check system preference for dark theme
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkTheme(prefersDark);
  }, []);

  // Apply dark theme to body
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);

  const startQuiz = () => {
    setQuizState('quiz');
    setScore(0);
    setUserAnswers([]);
    // Scroll to quiz section
    document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const finishQuiz = (finalScore, answers) => {
    setScore(finalScore);
    setUserAnswers(answers);
    setQuizState('results');
  };

  const restartQuiz = () => {
    setQuizState('start');
    setScore(0);
    setUserAnswers([]);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={`app ${darkTheme ? 'dark-theme' : ''}`}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">KnowledgeQuest</span>
          </div>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#quiz-section" className="nav-link">Quiz</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
            </li>
          </ul>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {darkTheme ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Only show when quiz hasn't started */}
      {quizState === 'start' && (
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title animate-fade-in">
                Challenge Your <span className="highlight">Mind</span>
              </h1>
              <p className="hero-subtitle animate-fade-in-delay">
                Test your knowledge with our interactive quiz platform. 
                Explore various topics and compete with friends!
              </p>
              <div className="hero-buttons animate-slide-up">
                <button className="cta-button primary" onClick={startQuiz}>
                  Start Quiz Now
                </button>
                <button className="cta-button secondary" onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Learn More
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Questions</span>
                </div>
                <div className="stat">
                  <span className="stat-number">10k+</span>
                  <span className="stat-label">Players</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Categories</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-card card-1">
                <span>📚</span>
                <p>Education</p>
              </div>
              <div className="floating-card card-2">
                <span>💻</span>
                <p>Technology</p>
              </div>
              <div className="floating-card card-3">
                <span>🌍</span>
                <p>Geography</p>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Quiz Section */}
        <section id="quiz-section" className="quiz-section">
          <div className="section-header">
            <h2>Take the Challenge</h2>
            <p>Test your knowledge with our carefully crafted questions</p>
          </div>
          
          <div className="quiz-container">
            {quizState === 'start' && (
              <div className="quiz-preview">
                <StartScreen onStart={startQuiz} />
              </div>
            )}

            {quizState === 'quiz' && (
              <Quiz onFinish={finishQuiz} />
            )}

            {quizState === 'results' && (
              <Results 
                score={score} 
                userAnswers={userAnswers}
                onRestart={restartQuiz}
              />
            )}
          </div>
        </section>

        {/* Features Section */}
        {quizState === 'start' && (
          <section className="features-section" id="about">
            <div className="section-header">
              <h2>Why Choose KnowledgeQuest?</h2>
              <p>Discover what makes our quiz platform unique</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Instant Feedback</h3>
                <p>Get immediate results and detailed explanations for each question.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Progress Tracking</h3>
                <p>Monitor your improvement with detailed analytics and progress reports.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌐</div>
                <h3>Multiple Categories</h3>
                <p>Explore quizzes across various topics from technology to history.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⏱️</div>
                <h3>Timed Challenges</h3>
                <p>Test your speed and accuracy with timed quiz modes.</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🧠</span>
              <span className="logo-text">KnowledgeQuest</span>
            </div>
            <p className="footer-description">
              Empowering minds through interactive learning and challenging quizzes.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="App.jsx">Home</a></li>
              <li><a href="Qui">Take Quiz</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><a href="#">Programming</a></li>
              <li><a href="#">Science</a></li>
              <li><a href="#">History</a></li>
              <li><a href="#">Mathematics</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p>📧 hello@knowledgequest.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Learning St, Education City</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 KnowledgeQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;