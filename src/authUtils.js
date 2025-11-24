// authUtils.js
const USERS_KEY = "studyHub_users"; 
const CURRENT_USER_KEY = "studyHub_currentUser"; 

// Add these base functions at the top
export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const saveUser = (newUser) => {
  const allUsers = getUsers();
  const userWithProgress = { 
    ...newUser, 
    progress: { totalQuizzes: 0, bestScore: 0, history: [] } 
  };
  
  allUsers.push(userWithProgress);
  localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithProgress));
  return userWithProgress;
};

export const getProgress = () => {
  const user = getCurrentUser();
  return user ? user.progress : { totalQuizzes: 0, bestScore: 0, history: [] };
};

// Update quiz progress after completing a quiz
export const updateQuizProgress = (quizScore, quizData = {}) => {
  const user = getCurrentUser();
  if (!user) return null;

  const progress = user.progress || { totalQuizzes: 0, bestScore: 0, history: [] };
  
  // Update progress
  progress.totalQuizzes += 1;
  
  // Update best score if current score is higher
  if (quizScore > progress.bestScore) {
    progress.bestScore = quizScore;
  }
  
  // Add to history
  progress.history.push({
    score: quizScore,
    date: new Date().toISOString(),
    quizName: quizData.name || 'General Quiz',
    totalQuestions: quizData.totalQuestions || 10,
    correctAnswers: Math.round((quizScore / 100) * (quizData.totalQuestions || 10)),
    timeTaken: quizData.timeTaken || 0
  });
  
  // Keep only last 20 attempts
  if (progress.history.length > 20) {
    progress.history = progress.history.slice(-20);
  }
  
  // Update user progress
  user.progress = progress;
  setCurrentUser(user);
  
  // Also update in users array
  const allUsers = getUsers();
  const userIndex = allUsers.findIndex(u => u.email === user.email);
  if (userIndex !== -1) {
    allUsers[userIndex].progress = progress;
    localStorage.setItem(USERS_KEY, JSON.stringify(allUsers));
  }
  
  return progress;
};

// Get user stats with calculations
export const getUserStats = () => {
  const user = getCurrentUser();
  if (!user) return null;
  
  const progress = user.progress || { totalQuizzes: 0, bestScore: 0, history: [] };
  
  // Calculate average score
  const averageScore = progress.history.length > 0 
    ? progress.history.reduce((sum, attempt) => sum + attempt.score, 0) / progress.history.length 
    : 0;
  
  // Calculate streak (consecutive scores above 70%)
  let streak = 0;
  for (let i = progress.history.length - 1; i >= 0; i--) {
    if (progress.history[i].score >= 70) {
      streak++;
    } else {
      break;
    }
  }
  
  // Calculate accuracy
  const totalQuestions = progress.history.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
  const correctAnswers = progress.history.reduce((sum, attempt) => sum + attempt.correctAnswers, 0);
  const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  
  return {
    ...progress,
    averageScore: Math.round(averageScore),
    currentStreak: streak,
    totalQuestions,
    correctAnswers,
    accuracy: Math.round(accuracy)
  };
};