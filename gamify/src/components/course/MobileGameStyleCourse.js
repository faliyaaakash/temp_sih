import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MobileGameStyleCourse = () => {
  const { subjectKey } = useParams();
  const navigate = useNavigate();
  const [studentProgress, setStudentProgress] = useState(() => {
    const saved = localStorage.getItem('studentProgress');
    return saved ? JSON.parse(saved) : {};
  });

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
  if (!subject) return null;

  // Calculate total points
  const totalPoints = Object.values(studentProgress).reduce((sum, item) => sum + (item.points || 0), 0);

  // Function to check if a chapter is unlocked
  const isChapterUnlocked = (chapterIndex) => {
    if (chapterIndex === 0) return true; // First chapter is always unlocked
    const prevChapter = subject.chapters[chapterIndex - 1];
    return studentProgress[prevChapter?.id]?.completed || false;
  };

  // Function to check if a chapter is completed
  const isChapterCompleted = (chapterId) => {
    return studentProgress[chapterId]?.completed || false;
  };


  // Handle chapter click
  const handleChapterClick = (chapter, chapterIndex) => {
    if (isChapterUnlocked(chapterIndex)) {
      navigate(`/subject/${subjectKey}/chapter/${chapter.id}`);
    }
  };

  // Main course view - Duolingo Style Chapter Page
  return (
    <div className="min-h-screen bg-slate-800 text-white">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(45deg); }
          50% { transform: rotate(60deg); }
        }
        .animate-blink {
          animation: blink 2s infinite;
        }
        .animate-wave {
          animation: wave 1s infinite;
        }
      `}</style>
      {/* Top Status Bar - Duolingo Style */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
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

      {/* Chapter Banner - Green Duolingo Style */}
      <div className="bg-lime-500 mx-4 mt-4 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">SECTION 1, UNIT 1</p>
            <h1 className="text-2xl font-bold">{subject.title}</h1>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Snake-like Progression Path - Centered Layout */}
      <div className="flex justify-center py-12 relative" style={{ minHeight: '1700px' }}>
        <div className="relative w-full max-w-5xl mx-auto px-12">
          {/* Real Road-Type Path - SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a5568" stopOpacity="1" />
                <stop offset="50%" stopColor="#2d3748" stopOpacity="1" />
                <stop offset="100%" stopColor="#1a202c" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="roadCenter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
              </linearGradient>
              <filter id="roadShadow">
                <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
              </filter>
            </defs>
            
            {/* Road Base - Main Path */}
            <path
              d="M 200 100 Q 400 140 200 220 Q 50 300 400 380 Q 200 460 400 540 Q 50 620 400 700 Q 200 780 400 860 Q 200 940 400 1020 Q 200 1100 400 1180 Q 200 1260 400 1340 Q 200 1420 400 1500 Q 200 1580 300 1640"
              stroke="url(#roadGradient)"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roadShadow)"
            />
            
            {/* Road Center Line */}
            <path
              d="M 200 100 Q 400 140 200 220 Q 50 300 400 380 Q 200 460 400 540 Q 50 620 400 700 Q 200 780 400 860 Q 200 940 400 1020 Q 200 1100 400 1180 Q 200 1260 400 1340 Q 200 1420 400 1500 Q 200 1580 300 1640"
              stroke="url(#roadCenter)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10,10"
            />
            
            {/* Road Edges */}
            <path
              d="M 200 100 Q 400 140 200 220 Q 50 300 400 380 Q 200 460 400 540 Q 50 620 400 700 Q 200 780 400 860 Q 200 940 400 1020 Q 200 1100 400 1180 Q 200 1260 400 1340 Q 200 1420 400 1500 Q 200 1580 300 1640"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
            
            {/* Road Side Lines */}
            <path
              d="M 200 100 Q 400 140 200 220 Q 50 300 400 380 Q 200 460 400 540 Q 50 620 400 700 Q 200 780 400 860 Q 200 940 400 1020 Q 200 1100 400 1180 Q 200 1260 400 1340 Q 200 1420 400 1500 Q 200 1580 300 1640"
              stroke="#ffffff"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />
          </svg>

          {/* Chapter Circles positioned along the centered snake path */}
          <div className="relative" style={{ zIndex: 2 }}>
          {subject.chapters.map((chapter, index) => {
            const isUnlocked = isChapterUnlocked(index);
            const isCompleted = isChapterCompleted(chapter.id);
            const isActive = index === 0 || (isUnlocked && !isCompleted);
              
              // Calculate positions exactly on the road path with maximum spacing
              const positions = [
                { top: '100px', left: '200px' },    // Chapter 1 - Start (on road)
                { top: '220px', left: '200px' },    // Chapter 2 - Left (on road)
                { top: '300px', left: '400px' },    // Chapter 3 - Right (on road)
                { top: '380px', left: '200px' },    // Chapter 4 - Left (on road)
                { top: '460px', left: '400px' },    // Chapter 5 - Right (on road)
                { top: '540px', left: '200px' },    // Chapter 6 - Left (on road)
                { top: '620px', left: '400px' },    // Chapter 7 - Right (on road)
                { top: '700px', left: '200px' },    // Chapter 8 - Left (on road)
                { top: '780px', left: '400px' },    // Chapter 9 - Right (on road)
                { top: '860px', left: '200px' },    // Chapter 10 - Left (on road)
                { top: '940px', left: '400px' },    // Chapter 11 - Right (on road)
                { top: '1020px', left: '200px' },   // Chapter 12 - Left (on road)
                { top: '1100px', left: '400px' },   // Chapter 13 - Right (on road)
                { top: '1180px', left: '200px' },   // Chapter 14 - Left (on road)
                { top: '1260px', left: '400px' },   // Chapter 15 - Right (on road)
                { top: '1340px', left: '200px' },   // Chapter 16 - Left (on road)
                { top: '1420px', left: '400px' },   // Chapter 17 - Right (on road)
                { top: '1500px', left: '200px' },   // Chapter 18 - Left (on road)
                { top: '1580px', left: '300px' },   // Chapter 19 - Center (on road)
              ];
              
              const position = positions[index] || { top: '900px', left: '280px' };
            
            return (
              <div key={chapter.id} className="absolute" style={position}>
                {/* Road Marker - Chapter Circle */}
                <div
                  onClick={() => handleChapterClick(chapter, index)}
                  className={`relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all transform hover:scale-110 ${
                    isCompleted
                      ? 'bg-green-500 shadow-2xl shadow-green-500/50 border-4 border-white'
                      : isActive
                      ? 'bg-blue-500 shadow-2xl shadow-blue-500/50 border-4 border-white'
                      : 'bg-gray-600 opacity-50 cursor-not-allowed border-4 border-gray-400'
                  }`}
                >
                  {/* Road Marker Ring */}
                  <div className={`absolute inset-0 rounded-full border-2 ${
                    isCompleted ? 'border-green-300' : isActive ? 'border-blue-300' : 'border-gray-400'
                  }`}></div>
                  
                  {/* Progress ring for active lesson */}
                  {isActive && !isCompleted && (
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-300 animate-spin"></div>
                  )}
                  
                  {/* Chapter number or icon inside circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isCompleted || isActive ? 'bg-white' : 'bg-gray-400'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    ) : (
                      <span className="text-xl font-bold text-gray-600">{index + 1}</span>
                    )}
                  </div>
                  
                  {/* Road Marker Sign */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border-2 border-gray-400 rounded-lg px-2 py-1 shadow-lg">
                    <span className="text-xs font-bold text-gray-700">Ch {index + 1}</span>
                  </div>
                </div>

                {/* Chapter Title */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-gray-800 px-3 py-1 rounded-lg text-xs font-medium text-white whitespace-nowrap">
                    {chapter.title}
                  </div>
                </div>

                {/* Treasure Chest for Chapter 2 */}
                {index === 1 && (
                  <div className="absolute -left-20 top-2 w-14 h-14 opacity-80">
                    <div className="w-full h-full bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce">
                      <svg className="w-7 h-7 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Duolingo-style Owl Mascot for Chapter 3 */}
                {index === 2 && (
                  <div className="absolute -right-24 top-0 w-18 h-18 opacity-90">
                    <div className="w-full h-full bg-green-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <div className="w-14 h-14 bg-green-300 rounded-full flex items-center justify-center">
                        <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 bg-green-100 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Stars around Owl */}
                {index === 2 && (
                  <div className="absolute -right-28 top-20 flex space-x-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}

                {/* Robot Character for Chapter 4 */}
                {index === 3 && (
                  <div className="absolute -left-24 top-0 w-16 h-16 opacity-85">
                    <div className="w-full h-full bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                      <div className="w-12 h-12 bg-blue-400 rounded flex items-center justify-center">
                        <div className="w-8 h-8 bg-blue-300 rounded flex items-center justify-center">
                          <div className="w-4 h-4 bg-blue-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Astronaut Character for Chapter 5 */}
                {index === 4 && (
                  <div className="absolute -right-22 top-2 w-16 h-16 opacity-85">
                    <div className="w-full h-full bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-xl">🚀</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wizard Character for Chapter 6 */}
                {index === 5 && (
                  <div className="absolute -left-22 top-0 w-16 h-16 opacity-85">
                    <div className="w-full h-full bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                      <div className="w-12 h-12 bg-indigo-400 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🧙</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dragon Character for Chapter 7 */}
                {index === 6 && (
                  <div className="absolute -right-20 top-0 w-18 h-18 opacity-85">
                    <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-14 h-14 bg-red-400 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🐉</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Knight Character for Chapter 8 */}
                {index === 7 && (
                  <div className="absolute -left-20 top-0 w-16 h-16 opacity-85">
                    <div className="w-full h-full bg-gray-600 rounded-lg flex items-center justify-center shadow-lg">
                      <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                        <span className="text-xl">⚔️</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fairy Character for Chapter 9 */}
                {index === 8 && (
                  <div className="absolute -right-20 top-0 w-16 h-16 opacity-85">
                    <div className="w-full h-full bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-xl">🧚</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating particles around active chapters */}
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="absolute -top-1 -right-3 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -bottom-2 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Static Completion Cartoon at End of Path */}
        <div className="absolute" style={{ top: '1640px', left: '300px', zIndex: 3 }}>
          <div className="text-center">
            {/* Static Celebration Character */}
            <div className="relative mb-4">
              {/* Main Character - Static Mascot */}
              <div className="relative mx-auto w-20 h-20">
                {/* Character Body */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg">
                  {/* Character Face */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full">
                    {/* Eyes */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
                    {/* Happy Mouth */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-red-400 rounded-full"></div>
                    {/* Cheeks */}
                    <div className="absolute top-2 -left-1 w-1 h-1 bg-pink-300 rounded-full"></div>
                    <div className="absolute top-2 -right-1 w-1 h-1 bg-pink-300 rounded-full"></div>
                  </div>
                  {/* Arms raised in celebration - Static */}
                  <div className="absolute -top-1 -left-1 w-2 h-4 bg-blue-500 rounded-full transform rotate-45"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-4 bg-blue-500 rounded-full transform -rotate-45"></div>
                  {/* Legs */}
                  <div className="absolute -bottom-1 left-1 w-2 h-3 bg-blue-600 rounded-full"></div>
                  <div className="absolute -bottom-1 right-1 w-2 h-3 bg-blue-600 rounded-full"></div>
                </div>
                
                {/* Celebration Hat - Static */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-full">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full"></div>
                </div>
                
                {/* Static Hearts */}
                <div className="absolute -top-4 -left-2 w-2 h-2 text-red-400 text-xs">💖</div>
                <div className="absolute -top-3 -right-3 w-1 h-1 text-pink-400 text-xs">💕</div>
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-1 h-1 text-red-300 text-xs">💗</div>
              </div>
              
              {/* Static Completion Banner */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 text-white px-3 py-1 rounded-lg shadow-lg border-2 border-yellow-300">
                <div className="text-xs font-bold">🎉 COMPLETE! 🎉</div>
                <div className="text-xs">🏆 MASTERY 🏆</div>
              </div>
              
              {/* Static Trophies */}
              <div className="absolute -top-6 -left-4 w-3 h-3 text-yellow-400 text-xs">🏆</div>
              <div className="absolute -top-5 -right-5 w-2 h-2 text-yellow-300 text-xs">🥇</div>
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-2 h-2 text-yellow-500 text-xs">⭐</div>
            </div>
            
            {/* Static Achievement Platform */}
            <div className="relative">
              {/* Platform Base */}
              <div className="w-24 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full shadow-lg mx-auto"></div>
              <div className="w-22 h-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full shadow-lg mx-auto -mt-1"></div>
              
              {/* Static Decorative Elements */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements - Centered Layout */}
        <div className="absolute top-20 right-20 w-16 h-16 opacity-30 animate-pulse">
          <div className="w-full h-full bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xl">🌟</span>
          </div>
        </div>

        <div className="absolute top-40 left-20 w-12 h-12 opacity-30 animate-bounce">
          <div className="w-full h-full bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg">🎯</span>
          </div>
        </div>

        <div className="absolute top-1/2 right-10 w-10 h-10 opacity-20 animate-ping">
          <div className="w-full h-full bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-base">💫</span>
          </div>
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-60 left-10 w-6 h-6 opacity-25 animate-bounce">
          <div className="w-full h-full bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs">✨</span>
          </div>
        </div>

        <div className="absolute bottom-40 right-10 w-8 h-8 opacity-25 animate-pulse">
          <div className="w-full h-full bg-green-400 rounded-full flex items-center justify-center">
            <span className="text-sm">🎈</span>
          </div>
        </div>

        <div className="absolute top-80 left-5 w-4 h-4 opacity-30 animate-ping">
          <div className="w-full h-full bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-xs">⭐</span>
          </div>
        </div>

        <div className="absolute bottom-60 left-10 w-6 h-6 opacity-25 animate-bounce">
          <div className="w-full h-full bg-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-xs">🎪</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MobileGameStyleCourse;
