
        document.addEventListener('DOMContentLoaded', function() {
            const darkModeToggle = document.getElementById('dark-mode-toggle');
            const setupCard = document.getElementById('setup-card');
            const quizCard = document.getElementById('quiz-card');
            const resultCard = document.getElementById('result-card');
            const startBtn = document.getElementById('start-btn');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const restartBtn = document.getElementById('restart-btn');
            const newQuizBtn = document.getElementById('new-quiz-btn');
            const questionText = document.getElementById('question-text');
            const optionsContainer = document.getElementById('options-container');
            const currentQuestionEl = document.getElementById('current-question');
            const totalQuestionsEl = document.getElementById('total-questions');
            const progressBar = document.getElementById('progress-bar');
            const scoreText = document.getElementById('score-text');
            const scoreBar = document.getElementById('score-bar');
            const scoreDetails = document.getElementById('score-details');
            const timerEl = document.getElementById('timer');
            const reviewContainer = document.getElementById('review-container');
            let questions = [];
            let currentQuestionIndex = 0;
            let score = 0;
            let userAnswers = [];
            let timer;
            let timeLeft = 30;
            darkModeToggle.addEventListener('change', function() {
                document.body.classList.toggle('dark-mode', this.checked);
            });
            startBtn.addEventListener('click', startQuiz);
            nextBtn.addEventListener('click', () => navigateQuestion('next'));
            prevBtn.addEventListener('click', () => navigateQuestion('prev'));
            restartBtn.addEventListener('click', restartQuiz);
            newQuizBtn.addEventListener('click', newQuiz);

            function startQuiz() {
                const category = document.getElementById('category').value;
                const amount = document.getElementById('amount').value;
                const difficulty = document.getElementById('difficulty').value;
                
                if (amount < 1 || amount > 50) {
                    alert('Please enter a number between 1 and 50');
                    return;
                }
                
                let apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;
                if (difficulty) {
                    apiUrl += `&difficulty=${difficulty}`;
                }
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.response_code === 0) {
                            questions = data.results;
                            initializeQuiz();
                        } else {
                            alert('Failed to fetch questions. Please try again.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Failed to fetch questions. Please try again.');
                    });
            }

            function initializeQuiz() {
                currentQuestionIndex = 0;
                score = 0;
                userAnswers = new Array(questions.length).fill(null);
                
                setupCard.classList.add('slide-out');
                setTimeout(() => {
                    setupCard.style.display = 'none';
                    quizCard.classList.add('card-visible');
                    totalQuestionsEl.textContent = questions.length;
                    showQuestion();
                }, 500);
            }

            function showQuestion() {
                resetTimer();
                startTimer();
                
                const question = questions[currentQuestionIndex];
                currentQuestionEl.textContent = currentQuestionIndex + 1;
                
                progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
                
                questionText.textContent = decodeHTML(question.question);
                
                optionsContainer.innerHTML = '';
                const options = [...question.incorrect_answers, question.correct_answer];
                
                shuffleArray(options);
                
                options.forEach((option, index) => {
                    const optionElement = document.createElement('div');
                    optionElement.classList.add('option');
                    optionElement.textContent = decodeHTML(option);
                    optionElement.dataset.value = option;
                    
                    optionElement.addEventListener('click', () => selectOption(optionElement));
                    
                    if (userAnswers[currentQuestionIndex] === option) {
                        optionElement.classList.add('selected');
                    }
                    
                    optionsContainer.appendChild(optionElement);
                });
                
                prevBtn.disabled = currentQuestionIndex === 0;
                nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next';
            }

            function selectOption(optionElement) {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                optionElement.classList.add('selected');
                
                userAnswers[currentQuestionIndex] = optionElement.dataset.value;
                
                document.querySelectorAll('.option').forEach(opt => {
                    opt.style.pointerEvents = 'none';
                });
                
                clearTimeout(timer);
                setTimeout(() => {
                    if (currentQuestionIndex < questions.length - 1) {
                        navigateQuestion('next');
                    } else {
                        finishQuiz();
                    }
                }, 1000);
            }

            function navigateQuestion(direction) {
                if (direction === 'next' && currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    showQuestion();
                } else if (direction === 'prev' && currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    showQuestion();
                } else if (direction === 'next' && currentQuestionIndex === questions.length - 1) {
                    finishQuiz();
                }
            }

            function finishQuiz() {
                clearInterval(timer);
                
                score = 0;
                questions.forEach((question, index) => {
                    if (userAnswers[index] === question.correct_answer) {
                        score++;
                    }
                });
                
                scoreText.textContent = `${score}/${questions.length}`;
                scoreBar.style.width = `${(score / questions.length) * 100}%`;
                
                let percentage = (score / questions.length) * 100;
                let message;
                
                if (percentage >= 80) {
                    message = "Excellent job! You're a quiz master!";
                } else if (percentage >= 60) {
                    message = "Good effort! You know your stuff.";
                } else if (percentage >= 40) {
                    message = "Not bad! Keep learning and try again.";
                } else {
                    message = "Keep practicing! You'll get better.";
                }
                
                scoreDetails.textContent = message;
                
                showAnswersReview();
                
                quizCard.classList.remove('card-visible');
                setTimeout(() => {
                    quizCard.style.display = 'none';
                    resultCard.classList.add('card-visible');
                }, 500);
            }

            function showAnswersReview() {
                reviewContainer.innerHTML = '';
                
                questions.forEach((question, index) => {
                    const reviewItem = document.createElement('div');
                    reviewItem.classList.add('review-item');
                    
                    const questionEl = document.createElement('div');
                    questionEl.classList.add('review-question');
                    questionEl.textContent = decodeHTML(question.question);
                    
                    const userAnswerEl = document.createElement('div');
                    userAnswerEl.classList.add('review-answer');
                    
                    const isCorrect = userAnswers[index] === question.correct_answer;
                    
                    if (isCorrect) {
                        userAnswerEl.innerHTML = `
                            <i class="fas fa-check-circle correct-icon"></i>
                            <span>Your answer: ${decodeHTML(userAnswers[index])} (Correct)</span>
                        `;
                    } else {
                        userAnswerEl.innerHTML = `
                            <i class="fas fa-times-circle incorrect-icon"></i>
                            <span>Your answer: ${decodeHTML(userAnswers[index] || 'Not answered')}</span>
                        `;
                        
                        const correctAnswerEl = document.createElement('div');
                        correctAnswerEl.classList.add('review-answer');
                        correctAnswerEl.innerHTML = `
                            <i class="fas fa-check-circle correct-icon"></i>
                            <span>Correct answer: ${decodeHTML(question.correct_answer)}</span>
                        `;
                        reviewItem.appendChild(correctAnswerEl);
                    }
                    
                    reviewItem.appendChild(questionEl);
                    reviewItem.appendChild(userAnswerEl);
                    
                    reviewContainer.appendChild(reviewItem);
                });
            }

            function restartQuiz() {
                currentQuestionIndex = 0;
                score = 0;
                userAnswers = new Array(questions.length).fill(null);
                
                resultCard.classList.remove('card-visible');
                setTimeout(() => {
                    resultCard.style.display = 'none';
                    quizCard.classList.add('card-visible');
                    showQuestion();
                }, 500);
            }

            function newQuiz() {
                resultCard.classList.remove('card-visible');
                setTimeout(() => {
                    resultCard.style.display = 'none';
                    setupCard.style.display = 'flex';
                    setupCard.classList.remove('slide-out');
                    setupCard.classList.add('fade-in');
                }, 500);
            }

            function startTimer() {
                timeLeft = 30;
                updateTimerDisplay();
                
                timer = setInterval(() => {
                    timeLeft--;
                    updateTimerDisplay();
                    
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        if (currentQuestionIndex < questions.length - 1) {
                            navigateQuestion('next');
                        } else {
                            finishQuiz();
                        }
                    }
                }, 1000);
            }
            
            function resetTimer() {
                clearInterval(timer);
                timeLeft = 30;
                updateTimerDisplay();
            }
            
            function updateTimerDisplay() {
                timerEl.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 10) {
                    timerEl.style.color = '#f72585';
                } else {
                    timerEl.style.color = 'inherit';
                }
            }

            function decodeHTML(html) {
                const txt = document.createElement('textarea');
                txt.innerHTML = html;
                return txt.value;
            }
            
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
        });