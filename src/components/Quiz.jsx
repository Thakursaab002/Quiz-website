import React, { useState, useEffect, useCallback } from 'react'

const Question = ({ question, onAnswer, questionNumber }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionClick = (index) => {
    setSelectedOption(index)
    setTimeout(() => {
      onAnswer(index)
      setSelectedOption(null)
    }, 300)
  }

  return (
    <div className="question-container">
      <h2 className="question-title">
        <span className="question-number">Question {questionNumber}</span>
        {question.question}
      </h2>
      
      <div className="options-grid">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === index ? 'selected' : ''}`}
            onClick={() => handleOptionClick(index)}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const questionsData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which language is used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "Which of these is a JavaScript framework?",
    options: ["Django", "Laravel", "React", "Spring"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What year was JavaScript created?",
    options: ["1995", "1998", "2000", "2005"],
    correctAnswer: 0
  },
  {
    id: 8,
    question: "Which HTML tag is used for JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is CSS used for?",
    options: [
      "Server-side programming",
      "Database management",
      "Styling web pages",
      "Mobile app development"
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Which method is used to update state in React?",
    options: ["setState()", "updateState()", "changeState()", "modifyState()"],
    correctAnswer: 0
  }
  // ... rest of your questions
]

function Quiz({ onFinish }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  const questions = questionsData

  const handleFinish = useCallback((answers = userAnswers) => {
    const correctAnswers = answers.filter(answer => answer.isCorrect).length
    const totalScore = (correctAnswers / questions.length) * 100
    onFinish(totalScore, answers, questions)
  }, [userAnswers, onFinish, questions])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleFinish()
    }
  }, [timeLeft, handleFinish])

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers, {
      questionId: questions[currentQuestion].id,
      selectedAnswer: answerIndex,
      isCorrect: answerIndex === questions[currentQuestion].correctAnswer
    }]
    
    setUserAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleFinish(newAnswers)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="quiz-content">
      <div className="quiz">
        <div className="quiz-header">
          <div className={`timer ${timeLeft <= 60 ? 'timer-warning' : ''}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {formatTime(timeLeft)}
          </div>
          <div className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <Question
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
        />
      </div>
    </div>
  )
}

const Results = ({ score, answers, questions, onRestart }) => {
  const correctCount = answers.filter(a => a.isCorrect).length
  const incorrectCount = answers.length - correctCount

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A+', message: 'Outstanding!', color: '#10b981' }
    if (score >= 80) return { grade: 'A', message: 'Excellent!', color: '#22c55e' }
    if (score >= 70) return { grade: 'B', message: 'Great Job!', color: '#84cc16' }
    if (score >= 60) return { grade: 'C', message: 'Good Effort!', color: '#eab308' }
    if (score >= 50) return { grade: 'D', message: 'Keep Practicing!', color: '#f97316' }
    return { grade: 'F', message: 'Try Again!', color: '#ef4444' }
  }

  const gradeInfo = getGrade(score)

  return (
    <div className="results-content">
      <div className="results">
        <div className="results-header">
          <h1 className="results-title">Quiz Complete!</h1>
          <div className="score-circle" style={{ borderColor: gradeInfo.color }}>
            <div className="score-value">{Math.round(score)}%</div>
            <div className="score-grade" style={{ color: gradeInfo.color }}>{gradeInfo.grade}</div>
          </div>
          <p className="score-message" style={{ color: gradeInfo.color }}>{gradeInfo.message}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card correct">
            <div className="stat-icon">✓</div>
            <div className="stat-value">{correctCount}</div>
            <div className="stat-label">Correct</div>
          </div>
          <div className="stat-card incorrect">
            <div className="stat-icon">✗</div>
            <div className="stat-value">{incorrectCount}</div>
            <div className="stat-label">Incorrect</div>
          </div>
          <div className="stat-card total">
            <div className="stat-icon">📝</div>
            <div className="stat-value">{questions.length}</div>
            <div className="stat-label">Total</div>
          </div>
        </div>

        <div className="answers-review">
          <h2 className="review-title">Review Your Answers</h2>
          {answers.map((answer, index) => {
            const question = questions.find(q => q.id === answer.questionId)
            return (
              <div key={index} className={`answer-card ${answer.isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
                <div className="answer-header">
                  <span className="answer-number">Q{index + 1}</span>
                  <span className={`answer-badge ${answer.isCorrect ? 'badge-correct' : 'badge-incorrect'}`}>
                    {answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                <p className="answer-question">{question.question}</p>
                <div className="answer-details">
                  <p className="user-answer">
                    <strong>Your answer:</strong> {question.options[answer.selectedAnswer]}
                  </p>
                  {!answer.isCorrect && (
                    <p className="correct-answer-text">
                      <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button className="restart-button" onClick={onRestart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Take Quiz Again
        </button>
      </div>
    </div>
  )
}

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-content">
      <div className="start-screen">
        <div className="quiz-icon">🎯</div>
        <h1 className="start-title">KnowledgeQuest</h1>
        <p className="start-description">
          Test your knowledge with our carefully crafted questions covering various topics 
          including web development, science, and technology.
        </p>
        
        <div className="quiz-info">
          <div className="info-item">
            <span className="info-icon">📝</span>
            <span>10 Questions</span>
          </div>
          <div className="info-item">
            <span className="info-icon">⏱️</span>
            <span>10 Minutes</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🏆</span>
            <span>Multiple Choice</span>
          </div>
        </div>

        <button className="start-button" onClick={onStart}>
          Start Quiz
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">KnowledgeQuest</h3>
          <p className="footer-description">
            Empowering minds through interactive learning and challenging quizzes.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#quiz">Take Quiz</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Categories</h4>
          <ul className="footer-links">
            <li><a href="#programming">Programming</a></li>
            <li><a href="#science">Science</a></li>
            <li><a href="#history">History</a></li>
            <li><a href="#mathematics">Mathematics</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact Info</h4>
          <div className="contact-info">
            <p>hello@knowledgequest.com</p>
            <p>+1 (555) 123-4567</p>
            <p>123 Learning St. Education City</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 KnowledgeQuest. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [quizState, setQuizState] = useState('start')
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])
  const [questions, setQuestions] = useState([])

  const handleStart = () => {
    setQuizState('quiz')
  }

  const handleFinish = (finalScore, finalAnswers, quizQuestions) => {
    setScore(finalScore)
    setAnswers(finalAnswers)
    setQuestions(quizQuestions)
    setQuizState('results')
  }

  const handleRestart = () => {
    setScore(0)
    setAnswers([])
    setQuestions([])
    setQuizState('start')
  }

  return (
    <div className="app">
      <div className="main-content">
        {quizState === 'start' && <StartScreen onStart={handleStart} />}
        {quizState === 'quiz' && <Quiz onFinish={handleFinish} />}
        {quizState === 'results' && (
          <Results 
            score={score} 
            answers={answers} 
            questions={questions}
            onRestart={handleRestart} 
          />
        )}
      </div>
      
      <Footer />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          color: #e2e8f0;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          width: 100%;
        }

        /* Start Screen */
        .start-content {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .start-screen {
          background: #1e293b;
          border-radius: 24px;
          padding: 60px 40px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid #334155;
          animation: slideUp 0.5s ease-out;
        }

        .start-content {
          text-align: center;
        }

        .quiz-icon {
          font-size: 80px;
          margin-bottom: 20px;
          animation: bounce 2s infinite;
          filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .start-title {
          font-size: 42px;
          color: #f8fafc;
          margin-bottom: 16px;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .start-description {
          font-size: 16px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .quiz-info {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          color: #cbd5e1;
          font-weight: 500;
          padding: 12px 20px;
          background: #334155;
          border-radius: 12px;
          border: 1px solid #475569;
        }

        .info-icon {
          font-size: 24px;
        }

        .start-button {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 18px 48px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          position: relative;
          overflow: hidden;
        }

        .start-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .start-button:hover::before {
          left: 100%;
        }

        .start-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
        }

        .start-button:active {
          transform: translateY(0);
        }

        /* Quiz Content */
        .quiz-content {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .quiz {
          background: #1e293b;
          border-radius: 24px;
          padding: 40px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid #334155;
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .timer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          color: #6366f1;
          padding: 12px 20px;
          background: #0f172a;
          border-radius: 12px;
          border: 1px solid #334155;
        }

        .timer-warning {
          color: #ef4444;
          animation: pulse 1s infinite;
          background: #450a0a;
          border-color: #7f1d1d;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .progress-text {
          font-size: 16px;
          color: #94a3b8;
          font-weight: 500;
        }

        .progress-bar {
          height: 8px;
          background: #334155;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 40px;
          border: 1px solid #475569;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
          transition: width 0.3s ease;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        }

        .question-container {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .question-title {
          font-size: 24px;
          color: #f8fafc;
          margin-bottom: 32px;
          line-height: 1.4;
        }

        .question-number {
          display: block;
          font-size: 14px;
          color: #6366f1;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .options-grid {
          display: grid;
          gap: 16px;
        }

        .option-button {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: #334155;
          border: 2px solid #475569;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
          text-align: left;
          color: #e2e8f0;
        }

        .option-button:hover {
          background: #475569;
          border-color: #6366f1;
          transform: translateX(8px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .option-button.selected {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-color: #6366f1;
          color: white;
          transform: scale(0.98);
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }

        .option-letter {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: #1e293b;
          color: #6366f1;
          border-radius: 8px;
          font-weight: 700;
          flex-shrink: 0;
          border: 1px solid #475569;
        }

        .option-button.selected .option-letter {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .option-text {
          flex: 1;
        }

        /* Results Content */
        .results-content {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .results {
          background: #1e293b;
          border-radius: 24px;
          padding: 40px;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid #334155;
          animation: slideUp 0.5s ease-out;
        }

        .results-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .results-title {
          font-size: 36px;
          color: #f8fafc;
          margin-bottom: 32px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .score-circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 8px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: scaleIn 0.5s ease-out;
          background: #0f172a;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .score-value {
          font-size: 48px;
          font-weight: 700;
          color: #f8fafc;
        }

        .score-grade {
          font-size: 28px;
          font-weight: 700;
          margin-top: 4px;
        }

        .score-message {
          font-size: 20px;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .stat-card.correct {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          border-color: #065f46;
        }

        .stat-card.incorrect {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          border-color: #7f1d1d;
        }

        .stat-card.total {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: white;
          border-color: #3730a3;
        }

        .stat-icon {
          font-size: 32px;
          margin-bottom: 8px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .answers-review {
          margin-bottom: 40px;
        }

        .review-title {
          font-size: 24px;
          color: #f8fafc;
          margin-bottom: 24px;
          border-bottom: 2px solid #334155;
          padding-bottom: 12px;
        }

        .answer-card {
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 16px;
          border-left: 4px solid;
          background: #0f172a;
          border: 1px solid #334155;
        }

        .answer-card.correct-answer {
          background: #052e16;
          border-left-color: #10b981;
          border-color: #065f46;
        }

        .answer-card.incorrect-answer {
          background: #450a0a;
          border-left-color: #ef4444;
          border-color: #7f1d1d;
        }

        .answer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .answer-number {
          font-weight: 700;
          color: #f8fafc;
        }

        .answer-badge {
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
        }

        .badge-correct {
          background: #10b981;
          color: white;
        }

        .badge-incorrect {
          background: #ef4444;
          color: white;
        }

        .answer-question {
          font-size: 16px;
          color: #e2e8f0;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .answer-details {
          font-size: 14px;
          color: #94a3b8;
        }

        .user-answer {
          margin-bottom: 8px;
        }

        .correct-answer-text {
          color: #10b981;
          font-weight: 500;
        }

        .restart-button {
          width: 100%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 18px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
          position: relative;
          overflow: hidden;
        }

        .restart-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .restart-button:hover::before {
          left: 100%;
        }

        .restart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
        }

        .restart-button:active {
          transform: translateY(0);
        }

        /* Footer */
        .footer {
          background: #0f172a;
          border-top: 1px solid #334155;
          padding: 40px 20px 20px;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 30px;
        }

        .footer-section h3,
        .footer-section h4 {
          color: #f8fafc;
          margin-bottom: 16px;
        }

        .footer-title {
          font-size: 24px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-subtitle {
          font-size: 18px;
          color: #e2e8f0;
        }

        .footer-description {
          color: #94a3b8;
          line-height: 1.6;
        }

        .footer-links {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 8px;
        }

        .footer-links a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #6366f1;
        }

        .contact-info p {
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .footer-bottom {
          border-top: 1px solid #334155;
          padding-top: 20px;
          text-align: center;
          color: #64748b;
        }

        @media (max-width: 640px) {
          .main-content {
            padding: 20px 15px;
          }

          .quiz, .results, .start-screen {
            padding: 24px;
          }

          .start-title {
            font-size: 32px;
          }

          .question-title {
            font-size: 20px;
          }

          .score-circle {
            width: 160px;
            height: 160px;
          }

          .score-value {
            font-size: 36px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .quiz-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </div>
  )
}