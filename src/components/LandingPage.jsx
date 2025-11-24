import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Rocket, Code, Laptop, Globe, Languages, Calculator, Leaf, Flame, Skull } from 'lucide-react';

const LandingPage = ({ onStartQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const categories = [
    {
      id: 'java-dsa',
      name: 'Java + DSA',
      icon: Code,
      description: 'Algorithms & Data Structures',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'tech',
      name: 'Technology',
      icon: Laptop,
      description: 'Latest in Tech',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'gk',
      name: 'General Knowledge',
      icon: Globe,
      description: 'World facts & trivia',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'english',
      name: 'English',
      icon: Languages,
      description: 'Grammar & vocabulary',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'math',
      name: 'Mathematics',
      icon: Calculator,
      description: 'Numbers & logic',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', icon: Leaf, color: 'from-green-500 to-emerald-500' },
    { id: 'medium', name: 'Medium', icon: Flame, color: 'from-orange-500 to-red-500' },
    { id: 'hard', name: 'Hard', icon: Skull, color: 'from-red-500 to-pink-500' }
  ];

  const questionAmounts = [5, 10, 15, 20];

  const handleStartQuiz = () => {
    if (selectedCategory && selectedDifficulty && selectedAmount) {
      onStartQuiz({
        category: selectedCategory,
        difficulty: selectedDifficulty,
        amount: selectedAmount
      });
    }
  };

  const isStartEnabled = selectedCategory && selectedDifficulty && selectedAmount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Quantum Quiz
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your knowledge with our interactive quiz experience powered by modern technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8"
        >
          {/* Category Selection */}
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Code className="w-6 h-6 text-purple-400" />
              Select Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `border-transparent bg-gradient-to-r ${category.color} shadow-lg shadow-purple-500/25`
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`p-3 rounded-full ${
                        selectedCategory === category.id 
                          ? 'bg-white/20' 
                          : 'bg-white/10'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-xs text-gray-400 text-center">{category.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-400" />
              Difficulty Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficulties.map((difficulty) => {
                const Icon = difficulty.icon;
                return (
                  <motion.button
                    key={difficulty.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedDifficulty === difficulty.id
                        ? `border-transparent bg-gradient-to-r ${difficulty.color} shadow-lg shadow-orange-500/25`
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Icon className="w-6 h-6" />
                      <span className="font-semibold">{difficulty.name}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Questions Amount */}
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="w-6 h-6 text-blue-400" />
              Number of Questions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {questionAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedAmount === amount
                      ? 'border-transparent bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25'
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold">{amount} Questions</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.button
              whileHover={{ scale: isStartEnabled ? 1.05 : 1 }}
              whileTap={{ scale: isStartEnabled ? 0.95 : 1 }}
              onClick={handleStartQuiz}
              disabled={!isStartEnabled}
              className={`px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                isStartEnabled
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              <Rocket className="w-5 h-5 inline mr-2" />
              Launch Quiz
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;