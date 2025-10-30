import React, { useState } from 'react';

const Question = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
      setSelectedOption('');
    }
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <h3>Question {questionNumber}/{totalQuestions}</h3>
        <div className="question-progress">
          <div className="progress-dots">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={`progress-dot ${i < questionNumber ? 'completed' : ''} ${i === questionNumber - 1 ? 'current' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="question-content">
        <h2 className="question-text">{question.question}</h2>
        
        <div className="options-grid">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        <div className="question-actions">
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={!selectedOption}
          >
            {questionNumber === totalQuestions ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;