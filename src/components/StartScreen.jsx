import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <section className="start-screen" id="home">
      <div className="start-container">
        <div className="start-content">
          <div className="start-header">
            <div className="welcome-icon">
              <span>🧠</span>
            </div>
            <h1>KnowledgeQuiz</h1>
            <p className="quiz-intro">
              Test your knowledge with 10 questions covering various topics including 
              web development, science, and technology. You'll have 10 minutes to complete the quiz.
            </p>
          </div>

          <div className="quiz-details">
            <div className="detail-card">
              <span className="detail-icon">📝</span>
              <div className="detail-text">
                <h3>10 Questions</h3>
                <p>Covering multiple topics</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="detail-icon">⏱️</span>
              <div className="detail-text">
                <h3>10 Minutes</h3>
                <p>Time to complete</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="detail-icon">🎯</span>
              <div className="detail-text">
                <h3>Multiple Choice</h3>
                <p>Select the correct answer</p>
              </div>
            </div>
          </div>

          <div className="categories-section" id="categories">
            <h2>Quiz Categories</h2>
            <div className="categories-grid">
              <div className="category-card">
                <span className="category-icon">💻</span>
                <h4>Web Development</h4>
                <p>HTML, CSS, JavaScript, React</p>
              </div>
              <div className="category-card">
                <span className="category-icon">🔬</span>
                <h4>Science</h4>
                <p>Biology, Chemistry, Physics</p>
              </div>
              <div className="category-card">
                <span className="category-icon">⚡</span>
                <h4>Technology</h4>
                <p>AI, Programming, Gadgets</p>
              </div>
              <div className="category-card">
                <span className="category-icon">📊</span>
                <h4>Mathematics</h4>
                <p>Algebra, Calculus, Statistics</p>
              </div>
            </div>
          </div>

          <div className="start-action">
            <button className="start-quiz-btn" onClick={onStart}>
              Start Quiz
            </button>
            <p className="quiz-note">Click Start Quiz to begin your knowledge challenge!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartScreen;