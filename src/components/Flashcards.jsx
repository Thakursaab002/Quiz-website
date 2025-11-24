import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Zap,
  BookOpen,
  BarChart2,
  User,
  Play,
  Trophy,
  Clock,
  CheckCircle,
  BrainCircuit,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// --- Quiz Configuration ---

const CATEGORIES = [
  {
    id: 17,
    name: "Science & Nature",
    icon: <Zap size={18} />,
    description: "Explore the wonders of nature and scientific phenomena",
  },
  {
    id: 18,
    name: "Computer Science",
    icon: <BrainCircuit size={18} />,
    description: "Dive into programming, algorithms and technology",
  },
  {
    id: 19,
    name: "Engineering Math",
    icon: <BarChart2 size={18} />,
    description: "Strengthen your problem-solving and math skills",
  },
  {
    id: 30,
    name: "Electronics & Gadgets",
    icon: <Play size={18} />,
    description: "Test your knowledge of modern gadgets and devices",
  },
  {
    id: 9,
    name: "General Knowledge",
    icon: <BookOpen size={18} />,
    description: "Test your knowledge across various topics",
  },
];

const QUESTION_COUNTS = [5, 10, 15];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const TIME_PER_QUESTION = 15; // seconds

// --- Flashcards Configuration ---

const FLASHCARD_SETS = [
  {
    id: "java",
    title: "Java & OOP",
    subtitle: "Core concepts for interviews",
    accent: "from-amber-400 to-orange-500",
    cards: [
      {
        front: "What is polymorphism in OOP?",
        back: "The ability of a single interface to represent different underlying forms (implementations). In Java, this is mainly achieved through method overriding and interfaces.",
      },
      {
        front: "What is encapsulation?",
        back: "Encapsulation is bundling data and methods that operate on that data within a single unit (class) and restricting direct access to some of the object's components.",
      },
      {
        front: "What is the JVM?",
        back: "The Java Virtual Machine is an abstract computing machine that enables a computer to run Java programs by converting bytecode into machine-specific instructions.",
      },
      {
        front: "Difference between abstract class and interface?",
        back: "Abstract class: can have state, non-abstract methods, and constructors. Interface: focuses on behavior contracts; in modern Java can have default and static methods but no instance state.",
      },
    ],
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    subtitle: "Must-know concepts",
    accent: "from-cyan-400 to-blue-500",
    cards: [
      {
        front: "Time complexity of binary search?",
        back: "O(log n) because the search space is halved on each step.",
      },
      {
        front: "What is a hash table?",
        back: "A data structure that stores key–value pairs and uses a hash function to compute an index into an array of buckets for O(1) average insertion and lookup.",
      },
      {
        front: "Stack vs Queue?",
        back: "Stack: LIFO (Last In First Out). Queue: FIFO (First In First Out).",
      },
      {
        front: "What is dynamic programming?",
        back: "A technique for solving problems by breaking them into overlapping subproblems and storing results to avoid recomputation.",
      },
    ],
  },
  {
    id: "cs",
    title: "CS Fundamentals",
    subtitle: "OS, DBMS, Networks basics",
    accent: "from-violet-400 to-fuchsia-500",
    cards: [
      {
        front: "What is a process in OS?",
        back: "A process is a running instance of a program, including its code, data, and execution context.",
      },
      {
        front: "What is normalization in DBMS?",
        back: "Process of structuring data to reduce redundancy and improve integrity, typically using normal forms (1NF, 2NF, 3NF, BCNF...).",
      },
      {
        front: "Difference between TCP and UDP?",
        back: "TCP is connection-oriented, reliable, and ordered. UDP is connectionless, faster, but does not guarantee delivery or order.",
      },
      {
        front: "What is a deadlock?",
        back: "A situation where a set of processes are blocked because each process holds a resource and waits for another resource held by some other process.",
      },
    ],
  },
  {
    id: "gk",
    title: "General Knowledge",
    subtitle: "Just for fun & curiosity",
    accent: "from-emerald-400 to-teal-500",
    cards: [
      {
        front: "Which is the largest planet in our solar system?",
        back: "Jupiter.",
      },
      {
        front: "Who wrote 'The Origin of Species'?",
        back: "Charles Darwin.",
      },
      {
        front: "What is the capital of Japan?",
        back: "Tokyo.",
      },
      {
        front: "Which gas do plants primarily absorb for photosynthesis?",
        back: "Carbon dioxide (CO₂).",
      },
    ],
  },
];

// --- Utilities ---

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// --- Shared UI Components ---

const NavButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-[#1a2333] text-cyan-400 shadow-inner shadow-black/50"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Navbar = ({ currentScreen, onNavigate }) => {
  const isQuizActive = ["setup", "countdown", "intro-loading", "quiz", "result"].includes(
    currentScreen
  );
  const isFlashcardsActive = currentScreen === "flashcards";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-[#0a0a12]/80 border-b border-white/5">
      <div
        onClick={() => onNavigate("setup")}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">
          <BrainCircuit size={20} />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          StudyHub
        </span>
      </div>

      <div className="hidden md:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/10 backdrop-blur-xl">
        <NavButton
          active={isQuizActive}
          icon={<Play size={16} />}
          label="Quiz"
          onClick={() => onNavigate("setup")}
        />
        <NavButton
          active={isFlashcardsActive}
          icon={<BookOpen size={16} />}
          label="Flashcards"
          onClick={() => onNavigate("flashcards")}
        />
        <NavButton icon={<BarChart2 size={16} />} label="Progress" />
        <NavButton icon={<User size={16} />} label="Profile" />
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden md:block px-5 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Login
        </button>
        <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

// 3D tilt card
const Card3D = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-100 ease-out will-change-transform ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      {children}
    </div>
  );
};

// --- Main App ---

function App() {
  // screens: setup, countdown, intro-loading, quiz, result, flashcards
  const [screen, setScreen] = useState("setup");

  // quiz config
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Medium");

  // quiz runtime state
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIME_PER_QUESTION);
  const [timerId, setTimerId] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [countdown, setCountdown] = useState(3);

  // flashcards state
  const [activeFlashSetId, setActiveFlashSetId] = useState(FLASHCARD_SETS[0].id);
  const [flashCardIndex, setFlashCardIndex] = useState(0);
  const [flashFlipped, setFlashFlipped] = useState(false);

  const currentQuestion = questions[currentIdx];

  // --- Navigation ---

  const resetQuizState = () => {
    setQuestions([]);
    setCurrentIdx(0);
    setScore(0);
    setAnswered(false);
    setTimeRemaining(TIME_PER_QUESTION);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setUserAnswers([]);
    setCountdown(3);
  };

  const handleNavigate = (targetScreen) => {
    if (targetScreen === "setup") {
      if (timerId) clearInterval(timerId);
      resetQuizState();
      setScreen("setup");
    } else if (targetScreen === "flashcards") {
      if (timerId) clearInterval(timerId);
      setScreen("flashcards");
    }
  };

  // --- Quiz Logic ---

  const handleStartQuiz = () => {
    if (!selectedCategory) return;
    resetQuizState();
    setScreen("countdown");
  };

  // countdown
  useEffect(() => {
    if (screen !== "countdown") return;
    if (countdown < 0) {
      setScreen("intro-loading");
      return;
    }
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [screen, countdown]);

  // fetch questions
  useEffect(() => {
    if (screen !== "intro-loading") return;

    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const difficultyParam = difficulty.toLowerCase();
        const url = `https://opentdb.com/api.php?amount=${questionCount}&category=${selectedCategory}&difficulty=${difficultyParam}&type=multiple`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();

        if (data.results?.length) {
          const mapped = data.results.map((q) => {
            const correct = decodeHTML(q.correct_answer);
            const incorrect = q.incorrect_answers.map(decodeHTML);
            return {
              question: decodeHTML(q.question),
              correct,
              answers: shuffle([correct, ...incorrect]),
            };
          });
          setQuestions(mapped);
          setScreen("quiz");
        } else {
          throw new Error("No results");
        }
      } catch (err) {
        // fallback
        setQuestions([
          {
            question: "What is the speed of light?",
            correct: "299,792,458 m/s",
            answers: [
              "300,000 km/s",
              "299,792,458 m/s",
              "150,000,000 km/s",
              "Sound speed",
            ],
          },
          {
            question: "Which planet is known as the Red Planet?",
            correct: "Mars",
            answers: ["Mars", "Venus", "Jupiter", "Saturn"],
          },
          {
            question: "What acts as the powerhouse of the cell?",
            correct: "Mitochondria",
            answers: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
          },
        ]);
        setScreen("quiz");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [screen, questionCount, selectedCategory, difficulty]);

  // timer
  useEffect(() => {
    if (screen !== "quiz" || !currentQuestion) return;
    if (timerId) clearInterval(timerId);

    setTimeRemaining(TIME_PER_QUESTION);
    const id = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(id);
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    setTimerId(id);
    return () => clearInterval(id);
  }, [screen, currentIdx, currentQuestion?.question]);

  const handleTimeUp = useCallback(() => {
    if (answered || !currentQuestion) return;
    setAnswered(true);
    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: null,
        correctAnswer: currentQuestion.correct,
        isCorrect: false,
        timeUp: true,
      },
    ]);
  }, [answered, currentQuestion]);

  // store answer only, no correctness shown yet
  const handleSelectAnswer = (answer) => {
    if (answered) return;
    if (timerId) clearInterval(timerId);
    const isCorrect = answer === currentQuestion.correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswered(true);
    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correct,
        isCorrect,
        timeUp: false,
      },
    ]);
  };

  const handleNext = () => {
    if (!answered) return;
    if (currentIdx + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrentIdx(currentIdx + 1);
      setAnswered(false);
      setTimeRemaining(TIME_PER_QUESTION);
    }
  };

  // --- Flashcards logic ---

  const activeFlashSet =
    FLASHCARD_SETS.find((s) => s.id === activeFlashSetId) || FLASHCARD_SETS[0];

  useEffect(() => {
    setFlashCardIndex(0);
    setFlashFlipped(false);
  }, [activeFlashSetId]);

  const currentFlashCard = activeFlashSet.cards[flashCardIndex];

  const handleFlashFlip = () => setFlashFlipped((prev) => !prev);

  const handleFlashNext = () => {
    setFlashCardIndex((idx) =>
      idx + 1 >= activeFlashSet.cards.length ? 0 : idx + 1
    );
    setFlashFlipped(false);
  };

  const handleFlashPrev = () => {
    setFlashCardIndex((idx) =>
      idx - 1 < 0 ? activeFlashSet.cards.length - 1 : idx - 1
    );
    setFlashFlipped(false);
  };

  // --- Render sections ---

  const renderSetup = () => (
    <div className="w-full max-w-4xl mx-auto z-10 animate-fade-in px-4">
      {/* Badge row with Back to Home */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1f36] border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-xs font-semibold tracking-wide text-cyan-100 uppercase">
            Interactive Quiz Setup
          </span>
        </div>

        <button
          onClick={() => handleNavigate("setup")}
          className="flex items-center gap-1 text-xs md:text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Configure Your Quiz
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Choose a subject, difficulty and how many questions you want to
          attempt. When you&apos;re ready, start the challenge and race against
          the clock.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Category */}
        <Card3D className="bg-[#121420]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="p-1.5 rounded bg-blue-500/20 text-blue-400">
              <BookOpen size={18} />
            </span>
            Select Category
          </h3>
          <div className="space-y-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    : "bg-[#0a0a12] border-slate-800 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedCategory === cat.id
                        ? "text-cyan-400 bg-cyan-950"
                        : "text-slate-500 bg-slate-900"
                    }`}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <span
                      className={`font-medium block ${
                        selectedCategory === cat.id
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {cat.name}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-slate-400">
                      {cat.description}
                    </span>
                  </div>
                </div>
                {selectedCategory === cat.id && (
                  <CheckCircle size={18} className="text-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </Card3D>

        {/* Difficulty + Count */}
        <Card3D className="bg-[#121420]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div className="space-y-8">
            {/* Difficulty */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="p-1.5 rounded bg-emerald-500/20 text-emerald-400">
                  <BrainCircuit size={18} />
                </span>
                Difficulty Level
              </h3>
              <div className="flex flex-wrap gap-3">
                {DIFFICULTIES.map((level) => {
                  const selected = difficulty === level;
                  return (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
                        selected
                          ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                          : "bg-[#0a0a12] text-slate-400 border-slate-800 hover:border-emerald-400/60 hover:text-emerald-200"
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question count */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="p-1.5 rounded bg-purple-500/20 text-purple-400">
                  <BarChart2 size={18} />
                </span>
                Question Count
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {QUESTION_COUNTS.map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                      questionCount === count
                        ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        : "bg-[#0a0a12] text-slate-400 border-slate-800 hover:border-purple-500/50 hover:text-purple-300"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5">
            <button
              onClick={handleStartQuiz}
              disabled={!selectedCategory}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
                selectedCategory
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/25 hover:scale-[1.02]"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              Start Quiz
            </button>
          </div>
        </Card3D>
      </div>
    </div>
  );

  const renderCountdown = () => (
    <div className="flex flex-col items-center justify-center z-10 animate-pulse">
      <h2 className="text-2xl text-cyan-400 font-bold mb-4 tracking-widest uppercase">
        Prepare Yourself
      </h2>
      <div className="text-[12rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] font-mono">
        {countdown >= 0 ? countdown : 0}
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="w-full max-w-3xl z-10 animate-fade-in-up px-4">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
            Category
          </span>
          <span className="text-white font-semibold flex items-center gap-2">
            {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
          </span>
          <span className="text-xs text-slate-500">
            Difficulty:{" "}
            <span className="text-cyan-300 font-semibold">{difficulty}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block">
              Progress
            </span>
            <span className="text-white font-mono">
              {currentIdx + 1} <span className="text-slate-600">/</span>{" "}
              {questions.length}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
              timeRemaining < 6
                ? "bg-red-500/10 border-red-500/50 text-red-400"
                : "bg-slate-800/50 border-slate-700 text-cyan-400"
            }`}
          >
            <Clock size={18} className={timeRemaining < 6 ? "animate-pulse" : ""} />
            <span className="font-mono font-bold text-lg">{timeRemaining}s</span>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${(currentIdx / questions.length) * 100}%` }}
        />
      </div>

      {/* question card */}
      <Card3D className="bg-[#121420]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">
          {currentQuestion?.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion?.answers.map((ans, idx) => {
            const isSelected = userAnswers[currentIdx]?.userAnswer === ans;
            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(ans)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group relative overflow-hidden ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                    : "bg-[#0a0a12] border-slate-700 hover:border-cyan-500/50 hover:bg-[#1a1f30] text-slate-200"
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                      isSelected
                        ? "bg-cyan-400 text-black"
                        : "bg-slate-800 text-slate-400 group-hover:bg-cyan-900 group-hover:text-cyan-200"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="font-medium text-base md:text-lg">{ans}</span>
                </div>
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-8 flex justify-end animate-fade-in">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {currentIdx + 1 === questions.length ? "Finish Quiz" : "Next Question"}{" "}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </Card3D>
    </div>
  );

  const renderResult = () => {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Keep Learning!";
    if (percentage > 80) message = "Masterful Performance!";
    else if (percentage > 50) message = "Good Job!";

    return (
      <div className="w-full max-w-2xl z-10 animate-fade-in-up px-4 text-center">
        <div className="inline-block p-6 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 mb-6 border border-yellow-500/30 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
          <Trophy size={64} className="text-yellow-400" />
        </div>

        <h2 className="text-5xl font-black text-white mb-2">{percentage}%</h2>
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
          {message}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#121420] p-6 rounded-2xl border border-white/5">
            <span className="text-slate-500 text-sm uppercase font-bold block mb-1">
              Correct
            </span>
            <span className="text-3xl font-bold text-emerald-400">{score}</span>
          </div>
          <div className="bg-[#121420] p-6 rounded-2xl border border-white/5">
            <span className="text-slate-500 text-sm uppercase font-bold block mb-1">
              Incorrect
            </span>
            <span className="text-3xl font-bold text-red-400">
              {questions.length - score}
            </span>
          </div>
        </div>

        {/* detailed review */}
        <div className="max-h-64 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900/70 p-4 space-y-3 text-sm mb-8">
          {userAnswers.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-700/70 bg-slate-900/80 p-3 text-left"
            >
              <p className="font-semibold text-slate-100 mb-1">
                Q{idx + 1}. {item.question}
              </p>
              {item.timeUp ? (
                <p className="text-xs text-amber-300">
                  ⏱ Time&apos;s up. Correct answer:{" "}
                  <span className="font-semibold text-emerald-300">
                    {item.correctAnswer}
                  </span>
                </p>
              ) : item.isCorrect ? (
                <p className="text-xs text-emerald-300">
                  ✓ Correct! You answered:{" "}
                  <span className="font-semibold">{item.userAnswer}</span>
                </p>
              ) : (
                <p className="text-xs text-rose-300">
                  ✗ Incorrect. You answered:{" "}
                  <span className="font-semibold">{item.userAnswer}</span> • Correct:{" "}
                  <span className="font-semibold text-emerald-300">
                    {item.correctAnswer}
                  </span>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              if (timerId) clearInterval(timerId);
              resetQuizState();
              setScreen("setup");
            }}
            className="px-8 py-3 rounded-full border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 transition-all font-semibold"
          >
            Back to Setup
          </button>
          <button
            onClick={handleStartQuiz}
            className="px-8 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  };

  // FLASHCARDS PAGE
  const renderFlashcards = () => (
    <div className="w-full max-w-5xl z-10 animate-fade-in-up px-4">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1f36] border border-purple-500/40">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs font-semibold tracking-wide text-purple-100 uppercase">
              Flashcard Mode
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Study with Animated Flashcards
          </h2>
          <p className="text-slate-400 max-w-xl text-sm md:text-base">
            Flip through concise Q&A cards. Perfect for last-minute revision
            before your viva, lab exam, or interview.
          </p>
        </div>

        <div className="hidden md:flex flex-col items-end gap-1 text-right text-xs text-slate-500">
          <span>Tip: Click the card to flip it</span>
          <span>Use Next / Previous to navigate</span>
        </div>
      </div>

      <div className="grid md:grid-cols-[1.1fr,1.4fr] gap-8 items-stretch">
        {/* deck selector */}
        <Card3D className="bg-[#111322]/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="p-1.5 rounded bg-cyan-500/20 text-cyan-400">
              <BookOpen size={18} />
            </span>
            Choose a Deck
          </h3>
          <div className="space-y-3">
            {FLASHCARD_SETS.map((set) => {
              const active = activeFlashSetId === set.id;
              return (
                <button
                  key={set.id}
                  onClick={() => setActiveFlashSetId(set.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                    active
                      ? "bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border-cyan-400/70 shadow-[0_0_30px_rgba(56,189,248,0.3)]"
                      : "bg-[#050612] border-slate-800 hover:border-slate-600"
                  }`}
                >
                  <div>
                    <p
                      className={`font-semibold ${
                        active ? "text-white" : "text-slate-200"
                      }`}
                    >
                      {set.title}
                    </p>
                    <p className="text-xs text-slate-400">{set.subtitle}</p>
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      active
                        ? "bg-black/60 text-cyan-300"
                        : "bg-slate-900 text-slate-400"
                    }`}
                  >
                    {set.cards.length} cards
                  </div>
                </button>
              );
            })}
          </div>
        </Card3D>

        {/* flip card area */}
        <div className="flex flex-col gap-4">
          <Card3D className="relative bg-[#111322]/90 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
              <span>
                Deck:{" "}
                <span className="text-cyan-300 font-semibold">
                  {activeFlashSet.title}
                </span>
              </span>
              <span className="font-mono">
                Card {flashCardIndex + 1} / {activeFlashSet.cards.length}
              </span>
            </div>

            {/* flip card */}
            <div
              className="relative h-64 md:h-72 cursor-pointer group [perspective:1200px]"
              onClick={handleFlashFlip}
            >
              <div
                className={`absolute inset-0 rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-br ${activeFlashSet.accent} from-20% to-80% overflow-hidden transition-transform duration-500 [transform-style:preserve-3d] ${
                  flashFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* front */}
                <div className="absolute inset-0 px-6 py-6 md:px-8 md:py-8 flex flex-col justify-between [backface-visibility:hidden]">
                  <div className="flex items-center justify-between text-xs text-slate-200/70 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/20">
                      <Sparkles size={14} />
                      Question
                    </span>
                    <span className="opacity-80">Click to reveal answer</span>
                  </div>
                  <p className="text-lg md:text-xl font-semibold text-white leading-relaxed">
                    {currentFlashCard.front}
                  </p>
                  <div className="flex items-center justify-end mt-4">
                    <span className="text-xs uppercase tracking-wide text-slate-100/80">
                      Front Side
                    </span>
                  </div>
                </div>

                {/* back */}
                <div className="absolute inset-0 px-6 py-6 md:px-8 md:py-8 flex flex-col justify-between bg-[#050610]/90 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="flex items-center justify-between text-xs text-slate-200/70 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-200">
                      <CheckCircle size={14} />
                      Answer
                    </span>
                    <span className="opacity-80">Click to hide answer</span>
                  </div>
                  <p className="text-base md:text-lg text-slate-100 leading-relaxed">
                    {currentFlashCard.back}
                  </p>
                  <div className="flex items-center justify-end mt-4">
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      Back Side
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>

          {/* controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={handleFlashPrev}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-500 transition-all"
              >
                Previous
              </button>
              <button
                onClick={handleFlashNext}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-cyan-50 transition-all flex items-center gap-1 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Next <ArrowRight size={14} />
              </button>
            </div>
            <button
              onClick={handleFlashFlip}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              Flip Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // --- root render ---

  return (
    <div className="min-h-screen bg-[#0a0a12] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-hidden relative">
      <Navbar currentScreen={screen} onNavigate={handleNavigate} />

      {/* background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <main className="relative pt-24 min-h-screen flex items-center justify-center">
        {screen === "setup" && renderSetup()}
        {screen === "countdown" && renderCountdown()}
        {screen === "intro-loading" && (
          <div className="flex flex-col items-center gap-4 z-10">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-cyan-200/70 font-mono text-sm animate-pulse">
              Fetching Questions...
            </p>
          </div>
        )}
        {screen === "quiz" && renderQuiz()}
        {screen === "result" && renderResult()}
        {screen === "flashcards" && renderFlashcards()}
      </main>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
