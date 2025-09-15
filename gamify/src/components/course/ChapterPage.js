import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FillInTheBlanks from './games/FillInTheBlanks';
import FlipCardGame from './games/FlipCardGame';
import MemoryGame from './games/MemoryGame';

const ChapterPage = () => {
  const { subjectKey, chapterId } = useParams();
  const navigate = useNavigate();
  const [studentProgress, setStudentProgress] = useState(() => {
    const saved = localStorage.getItem('studentProgress');
    return saved ? JSON.parse(saved) : {};
  });
  const [currentGame, setCurrentGame] = useState(null);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('studentProgress', JSON.stringify(studentProgress));
  }, [studentProgress]);

  // Subject data based on the Dashboard structure
  const subjectsData = {
    mathematics: {
      title: 'Mathematics',
      icon: '🔢',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-600',
      chapters: [
        {
          id: 'math-ch1',
          title: 'Basic Arithmetic',
          description: 'Learn addition, subtraction, multiplication, and division',
          isUnlocked: true,
          isCompleted: false,
          games: [
            { id: 'math-ch1-g1', name: 'Addition Adventure', type: 'fill-blanks', component: 'FillInTheBlanks', points: 10, completed: false },
            { id: 'math-ch1-g2', name: 'Number Memory', type: 'memory', component: 'MemoryGame', points: 15, completed: false }
          ]
        },
        {
          id: 'math-ch2',
          title: 'Fractions & Decimals',
          description: 'Understanding parts of whole numbers',
          isUnlocked: false,
          isCompleted: false,
          games: [
            { id: 'math-ch2-g1', name: 'Fraction Flip', type: 'flip-card', component: 'FlipCardGame', points: 20, completed: false },
            { id: 'math-ch2-g2', name: 'Decimal Memory', type: 'memory', component: 'MemoryGame', points: 15, completed: false }
          ]
        },
        {
          id: 'math-ch3',
          title: 'Algebra Basics',
          description: 'Introduction to variables and equations',
          isUnlocked: false,
          isCompleted: false,
          games: [
            { id: 'math-ch3-g1', name: 'Variable Adventure', type: 'fill-blanks', component: 'FillInTheBlanks', points: 25, completed: false },
            { id: 'math-ch3-g2', name: 'Equation Memory', type: 'memory', component: 'MemoryGame', points: 20, completed: false }
          ]
        }
      ]
    },
    science: {
      title: 'Science',
      icon: '🔬',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-600',
      chapters: [
        {
          id: 'sci-ch1',
          title: 'Living Things',
          description: 'Plants, animals, and life processes',
          isUnlocked: true,
          isCompleted: false,
          games: [
            { id: 'sci-ch1-g1', name: 'Life Cycle Adventure', type: 'fill-blanks', component: 'FillInTheBlanks', points: 10, completed: false },
            { id: 'sci-ch1-g2', name: 'Animal Memory', type: 'memory', component: 'MemoryGame', points: 15, completed: false }
          ]
        },
        {
          id: 'sci-ch2',
          title: 'Matter & Materials',
          description: 'Properties of different materials',
          isUnlocked: false,
          isCompleted: false,
          games: [
            { id: 'sci-ch2-g1', name: 'Material Flip', type: 'flip-card', component: 'FlipCardGame', points: 20, completed: false },
            { id: 'sci-ch2-g2', name: 'Property Memory', type: 'memory', component: 'MemoryGame', points: 15, completed: false }
          ]
        },
        {
          id: 'sci-ch3',
          title: 'Forces & Motion',
          description: 'Understanding how things move',
          isUnlocked: false,
          isCompleted: false,
          games: [
            { id: 'sci-ch3-g1', name: 'Motion Adventure', type: 'fill-blanks', component: 'FillInTheBlanks', points: 25, completed: false },
            { id: 'sci-ch3-g2', name: 'Force Memory', type: 'memory', component: 'MemoryGame', points: 20, completed: false }
          ]
        }
      ]
    },
    computer: {
      title: 'Computer Science',
      icon: '💻',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-600',
      chapters: [
        {
          id: 'comp-ch1',
          title: 'Computer Basics',
          description: 'Understanding hardware and software',
          isUnlocked: true,
          isCompleted: false,
          games: [
            { id: 'comp-ch1-g1', name: 'Hardware Adventure', type: 'fill-blanks', component: 'FillInTheBlanks', points: 10, completed: false },
            { id: 'comp-ch1-g2', name: 'Component Memory', type: 'memory', component: 'MemoryGame', points: 15, completed: false }
          ]
        },
        {
          id: 'comp-ch2',
          title: 'Programming Fundamentals',
          description: 'Introduction to coding concepts',
          isUnlocked: false,
          isCompleted: false,
          games: [
            { id: 'comp-ch2-g1', name: 'Code Flip', type: 'flip-card', component: 'FlipCardGame', points: 20, completed: false },
            { id: 'comp-ch2-g2', name: 'Syntax Memory', type: 'memory', component: 'MemoryGame', points: 15, completed: false }
          ]
        },
        {
          id: 'comp-ch3',
          title: 'Algorithms & Logic',
          description: 'Step-by-step problem solving',
          isUnlocked: false,
          isCompleted: false,
          games: [
            { id: 'comp-ch3-g1', name: 'Logic Adventure', type: 'fill-blanks', component: 'FillInTheBlanks', points: 25, completed: false },
            { id: 'comp-ch3-g2', name: 'Algorithm Memory', type: 'memory', component: 'MemoryGame', points: 20, completed: false }
          ]
        }
      ]
    }
  };

  const subject = subjectsData[subjectKey];
  if (!subject) {
    navigate('/dashboard/student');
    return null;
  }

  const chapter = subject.chapters.find(ch => ch.id === chapterId);
  if (!chapter) {
    navigate(`/subject/${subjectKey}`);
    return null;
  }

  // Calculate total points
  const totalPoints = Object.values(studentProgress).reduce((sum, item) => sum + (item.points || 0), 0);

  // Function to check if a game is completed
  const isGameCompleted = (gameId) => {
    return studentProgress[gameId]?.completed || false;
  };

  // Function to complete a game
  const completeGame = (gameId, points) => {
    setStudentProgress(prev => ({
      ...prev,
      [gameId]: { completed: true, points }
    }));
  };

  // Function to complete a chapter
  const completeChapter = (chapterId) => {
    setStudentProgress(prev => ({
      ...prev,
      [chapterId]: { completed: true }
    }));
  };

  // Handle game selection
  const handleGameSelect = (game) => {
    setCurrentGame(game);
  };

  // Handle game completion
  const handleGameComplete = (gameId, points) => {
    completeGame(gameId, points);
    setCurrentGame(null);
    // Check if all games in the chapter are completed
    const allGamesCompleted = chapter.games.every(game => 
      isGameCompleted(game.id) || game.id === gameId
    );
    if (allGamesCompleted) {
      completeChapter(chapter.id);
    }
  };

  // Render game component
  const renderGameComponent = () => {
    if (!currentGame) return null;

    const gameProps = {
      onComplete: (points) => handleGameComplete(currentGame.id, points),
      onBack: () => setCurrentGame(null)
    };

    switch (currentGame.component) {
      case 'FillInTheBlanks':
        return <FillInTheBlanks {...gameProps} />;
      case 'FlipCardGame':
        return <FlipCardGame {...gameProps} />;
      case 'MemoryGame':
        return <MemoryGame {...gameProps} />;
      default:
        return null;
    }
  };

  // If a game is selected, show the game
  if (currentGame) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <button 
            onClick={() => setCurrentGame(null)}
            className="text-white hover:text-gray-300"
          >
            ← Back to Chapter
          </button>
          <h2 className="text-lg font-semibold">{currentGame.name}</h2>
          <div className="w-16"></div>
        </div>
        <div className="p-4">
          {renderGameComponent()}
        </div>
      </div>
    );
  }

  // Main chapter view
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Status Bar */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Recording indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          {/* Streak */}
          <div className="flex items-center space-x-1">
            <span className="text-orange-400 text-lg">🔥</span>
            <span className="text-sm font-medium">1</span>
          </div>
          {/* Gems */}
          <div className="flex items-center space-x-1">
            <span className="text-blue-400 text-lg">💎</span>
            <span className="text-sm font-medium">{totalPoints}</span>
          </div>
          {/* Hearts/Lives */}
          <div className="flex items-center space-x-1">
            <span className="text-pink-400 text-lg">⚡</span>
            <span className="text-sm font-medium">25</span>
          </div>
        </div>
        {/* Back Button */}
        <button 
          onClick={() => navigate('/dashboard/student')}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Chapter Banner */}
      <div className="bg-lime-500 mx-4 mt-4 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">CHAPTER {subject.chapters.findIndex(ch => ch.id === chapterId) + 1}</p>
            <h1 className="text-2xl font-bold">{chapter.title}</h1>
            <p className="text-sm opacity-90 mt-1">{chapter.description}</p>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{subject.icon}</span>
          </div>
        </div>
      </div>

      {/* Chapter Content with Enhanced Spacing */}
      <div className="px-12 py-16">
        {/* Chapter Info Card */}
        <div className="bg-gray-800 rounded-2xl p-12 mb-16 shadow-2xl">
          <h3 className="text-4xl font-bold mb-6 text-center">{chapter.title}</h3>
          <p className="text-gray-300 mb-12 text-xl text-center max-w-3xl mx-auto leading-relaxed">{chapter.description}</p>
          <div className="flex items-center justify-center space-x-12 text-xl text-gray-400">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🎮</span>
              <span>{chapter.games.length} Games</span>
            </div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">⭐</span>
              <span>{chapter.games.reduce((sum, game) => sum + game.points, 0)} Points Available</span>
            </div>
          </div>
        </div>

        {/* Games Section with Maximum Spacing */}
        <div className="space-y-20">
          <h4 className="text-3xl font-bold mb-16 text-center">Games in this Chapter</h4>
          <div className="grid gap-20 max-w-6xl mx-auto">
            {chapter.games.map((game, index) => (
              <div
                key={game.id}
                onClick={() => handleGameSelect(game)}
                className={`p-10 rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-105 shadow-2xl ${
                  isGameCompleted(game.id)
                    ? 'bg-green-900/20 border-green-500 text-green-300 hover:bg-green-900/30'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl ${
                      isGameCompleted(game.id) ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {isGameCompleted(game.id) ? '✓' : (index + 1)}
                    </div>
                    <div>
                      <h5 className="text-2xl font-semibold mb-3">{game.name}</h5>
                      <p className="text-gray-400 text-xl">{game.points} points</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    {isGameCompleted(game.id) && (
                      <span className="text-green-400 text-xl font-medium">✓ Completed</span>
                    )}
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
