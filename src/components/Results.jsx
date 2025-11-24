import React from 'react'

const Results = ({ score, userAnswers, onRestart }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'excellent'
    if (score >= 60) return 'good'
    if (score >= 40) return 'average'
    return 'poor'
  }

  const getScoreMessage = () => {
    if (score >= 80) return 'Excellent! 🎉'
    if (score >= 60) return 'Good job! 👍'
    if (score >= 40) return 'Not bad! 😊'
    return 'Keep practicing! 📚'
  }

  return (
    <div className="results">
      <h2>Quiz Completed!</h2>
      <div className={`score ${getScoreColor()}`}>
        <h3>Your Score: {score.toFixed(1)}%</h3>
        <p>{getScoreMessage()}</p>
      </div>
      
      <div className="results-details">
        <p>Correct Answers: {userAnswers.filter(a => a.isCorrect).length}</p>
        <p>Total Questions: {userAnswers.length}</p>
      </div>

      <button className="restart-btn" onClick={onRestart}>
        Take Quiz Again
      </button>
    </div>
  )
}


export default Results