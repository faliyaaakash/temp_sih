import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, PlanetIcon, RocketIcon, RobotHeadIcon, SparkleIcon, BlobShape } from '../icons/IconLibrary';
import { bootstrapDefaults, authApi, userApi, classApi } from '../utils/storage';

// Subject-Chapter-Game data structure
const subjectsData = {
  mathematics: {
    title: 'Mathematics',
    icon: '🔢',
    color: 'from-blue-500 to-cyan-500',
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

const roleConfig = {
  student: {
    title: 'Student Dashboard',
    kpis: [
      { label: 'Points', value: '0' },
      { label: 'Level', value: '1' },
      { label: 'Day Streak', value: '7' },
      { label: 'Badges', value: '0' }
    ]
  },
  teacher: {
    title: 'Teacher Dashboard',
    kpis: [
      { label: 'Total Students', value: '120' },
      { label: 'Avg Progress', value: '72%' },
      { label: 'Weekly Growth', value: '+8%' },
      { label: 'Engagement', value: '85%' }
    ],
    sections: [
      {
        title: 'Classroom Overview',
        table: {
          headers: ['Student Name', 'Progress', 'Status', 'Weak Area', 'Last Active'],
          rows: [
            ['Rahul Kumar', '75%', 'active', 'Algebra', '2 hours ago'],
            ['Priya Sharma', '85%', 'active', '—', '1 hour ago'],
            ['Amit Patel', '60%', 'inactive', 'Geometry', '1 day ago'],
            ['Neha Verma', '92%', 'active', '—', '30 min ago'],
            ['Raj Singh', '45%', 'struggling', 'Fractions', '3 days ago']
          ]
        }
      }
    ]
  },
 admin: {
    title: 'School Administration',
    kpis: [
      { label: 'Total Students', value: '450' },
      { label: 'Teachers', value: '25' },
      { label: 'Courses', value: '12' },
      { label: 'Classes', value: '18' },
      { label: 'Performance', value: '75%' }
    ],
    sections: [
      {
        title: 'Quick Actions',
        actions: [
          { label: 'Add Teacher', color: 'from-purple-500 to-blue-500' },
          { label: 'Enroll Student', color: 'from-green-500 to-emerald-600' },
          { label: 'Add Course', color: 'from-amber-500 to-orange-600' },
          { label: 'Export Report', color: 'from-gray-500 to-gray-600' }
        ]
      }
    ]
  }
};

const Badge = ({ label, value }) => (
  <div className="card text-center">
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const Dashboard = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [studentProgress, setStudentProgress] = useState(() => {
    // Load student progress from localStorage or initialize
    const saved = localStorage.getItem('studentProgress');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeTab, setActiveTab] = useState('courses');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  useEffect(() => { bootstrapDefaults(); }, []);
  const currentUser = authApi.current();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
      if (showProfileInfo && !event.target.closest('.profile-info-dropdown')) {
        setShowProfileInfo(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown, showProfileInfo]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('studentProgress', JSON.stringify(studentProgress));
  }, [studentProgress]);

  // Function to check if a chapter is unlocked
  const isChapterUnlocked = (subjectKey, chapterIndex) => {
    if (chapterIndex === 0) return true; // First chapter is always unlocked
    const prevChapter = subjectsData[subjectKey].chapters[chapterIndex - 1];
    return studentProgress[prevChapter?.id]?.completed || false;
  };

  // Function to check if a chapter is completed
  const isChapterCompleted = (chapterId) => {
    return studentProgress[chapterId]?.completed || false;
  };

  // Function to check if a game is completed
  const isGameCompleted = (gameId) => {
    return studentProgress[gameId]?.completed || false;
  };


  // Function to handle subject selection
  const handleSubjectSelect = (subjectKey) => {
    navigate(`/subject/${subjectKey}`);
  };


  // Calculate total points
  const totalPoints = Object.values(studentProgress).reduce((sum, item) => sum + (item.points || 0), 0);

  // Calculate completed chapters
  const completedChapters = Object.keys(studentProgress).filter(key => 
    subjectsData.mathematics.chapters.some(ch => ch.id === key) ||
    subjectsData.science.chapters.some(ch => ch.id === key) ||
    subjectsData.computer.chapters.some(ch => ch.id === key)
  ).length;

  const cfg = roleConfig[role] || roleConfig.student;


  if (role === 'student') {
    // Calculate progress for each subject
    const getSubjectProgress = (subjectKey) => {
      const subject = subjectsData[subjectKey];
      const completedChapters = subject.chapters.filter(chapter => isChapterCompleted(chapter.id)).length;
      return Math.round((completedChapters / subject.chapters.length) * 100);
    };

    // Calculate current level based on points
    const getCurrentLevel = () => {
      return Math.floor(totalPoints / 100) + 1;
    };

    // Calculate day streak (mock data for now)
    const dayStreak = 7;

    return (
      <div className="min-h-screen bg-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 1 1 15 0v5z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
                </button>
                <select className="text-sm border-0 bg-transparent">
                  <option>EN</option>
                </select>
                
                {/* Profile Button */}
                <div className="relative profile-info-dropdown">
                  <button 
                    onClick={() => setShowProfileInfo(!showProfileInfo)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                      </span>
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileInfo && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-medium">
                              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {currentUser?.name || 'Student User'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {currentUser?.email || 'student@example.com'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wide font-medium">
                          Progress Summary
                        </div>
                        <div className="px-4 py-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total Points:</span>
                            <span className="font-medium">{totalPoints}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Current Level:</span>
                            <span className="font-medium">{getCurrentLevel()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Day Streak:</span>
                            <span className="font-medium">{dayStreak}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Badges:</span>
                            <span className="font-medium">0</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-100 py-2">
                        <button 
                          onClick={() => {
                            setShowProfileInfo(false);
                            navigate(`/profile/${role}`);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>View Full Profile</span>
                        </button>
                        <button 
                          onClick={() => {
                            setShowProfileInfo(false);
                            // Add logout functionality here
                            navigate('/');
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-purple-600 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <h2 className="text-2xl font-bold">Welcome, Student!</h2>
            </div>
            <p className="text-purple-100 mt-1">Student Dashboard</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-purple-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div>
                  <div className="text-2xl font-bold">{totalPoints} Points</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div>
                  <div className="text-2xl font-bold">{getCurrentLevel()} Level</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <div>
                  <div className="text-2xl font-bold">{dayStreak} Day Streak</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <div>
                  <div className="text-2xl font-bold">0 Badges</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('courses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'courses' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Courses
              </button>
              <button 
                onClick={() => setActiveTab('achievements')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'achievements' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Achievements
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mathematics Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">🔢</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Mathematics</h3>
                    <p className="text-sm text-gray-500">Mathematics</p>
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">beginner</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{getSubjectProgress('mathematics')}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${getSubjectProgress('mathematics')}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  0 of 20 Games Completed
                </div>

                <button 
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                  onClick={() => handleSubjectSelect('mathematics')}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Continue Learning</span>
                </button>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Chapters (10)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">Basic Arithmetic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Fractions & Decimals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Algebra Basics</span>
                    </div>
                    <div className="text-sm text-gray-500">+7 more chapters</div>
                  </div>
                </div>
              </div>

              {/* Science Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Science</h3>
                    <p className="text-sm text-gray-500">Science</p>
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">beginner</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{getSubjectProgress('science')}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${getSubjectProgress('science')}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  0 of 20 Games Completed
                </div>

                <button 
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                  onClick={() => handleSubjectSelect('science')}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Continue Learning</span>
                </button>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Chapters (10)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">Living Things</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Matter & Materials</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Forces & Motion</span>
                    </div>
                    <div className="text-sm text-gray-500">+7 more chapters</div>
                  </div>
                </div>
              </div>

              {/* Computer Science Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Computer Science</h3>
                    <p className="text-sm text-gray-500">Computer</p>
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">beginner</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{getSubjectProgress('computer')}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${getSubjectProgress('computer')}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  0 of 20 Games Completed
                </div>

                <button 
                  className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2"
                  onClick={() => handleSubjectSelect('computer')}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Continue Learning</span>
                </button>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Chapters (10)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm text-gray-700">Computer Basics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Programming Fundamentals</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-500">Algorithms & Logic</span>
                    </div>
                    <div className="text-sm text-gray-500">+7 more chapters</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'achievements' && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Achievements Yet</h3>
                <p className="text-gray-500 mb-6">
                  Complete courses and games to earn achievements and badges!
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">How to Earn Achievements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <span className="text-gray-700">Complete chapters</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <span className="text-gray-700">Finish games</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <span className="text-gray-700">Maintain streaks</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Dashboard;

// Teacher tool to add students to classes
const TeacherTools = ({ onChange }) => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [klassId, setKlassId] = useState('');

  const classes = classApi.all();

  useEffect(() => {
    if (!klassId && classes.length) setKlassId(classes[0].id);
  }, [classes, klassId]);

  const handleAddStudent = () => {
    if (!studentName || !studentEmail || !klassId) return;
    const newStudent = { id: `u${Date.now()}`, role: 'student', name: studentName, email: studentEmail, password: 'student123', verified: false };
    userApi.add(newStudent);
    classApi.addStudent(klassId, newStudent.id);
    setStudentName(''); setStudentEmail('');
    onChange?.();
  };

  return (
    <div className="card border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Add Student to Class</h3>
      <div className="grid md:grid-cols-3 gap-3 mb-3">
        <input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Student name" className="px-3 py-2 bg-dark-800 border border-slate-600 rounded" />
        <input value={studentEmail} onChange={e=>setStudentEmail(e.target.value)} placeholder="Student email" className="px-3 py-2 bg-dark-800 border border-slate-600 rounded" />
        <select value={klassId} onChange={e=>setKlassId(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
          {classes.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>
      </div>
      <button onClick={handleAddStudent} className="btn btn-primary shadow-glow">Add Student</button>
    </div>
  );
};

// Admin tools to verify, create classes, assign teacher and students
const AdminTools = ({ onChange }) => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('Math');
  const [teacherId, setTeacherId] = useState('');
  const [classIdAssign, setClassIdAssign] = useState('');
  const [studentIdAssign, setStudentIdAssign] = useState('');

  const users = userApi.all();
  const teachers = users.filter(u=>u.role==='teacher' && u.verified!==false);
  const students = users.filter(u=>u.role==='student' && u.verified!==false);
  const classes = classApi.all();

  useEffect(() => {
    if (!teacherId && teachers.length) setTeacherId(teachers[0].id);
    if (!classIdAssign && classes.length) setClassIdAssign(classes[0].id);
    if (!studentIdAssign && students.length) setStudentIdAssign(students[0].id);
  }, [teachers, classes, students, teacherId, classIdAssign, studentIdAssign]);

  const handleCreateClass = () => {
    if (!className) return;
    classApi.create({ id: `c${Date.now()}`, name: className, subject, teacherId, studentIds: [] });
    setClassName('');
    onChange?.();
  };

  const handleAssignTeacher = () => { if (classIdAssign && teacherId) { classApi.assignTeacher(classIdAssign, teacherId); onChange?.(); } };
  const handleAssignStudent = () => { if (classIdAssign && studentIdAssign) { classApi.addStudent(classIdAssign, studentIdAssign); onChange?.(); } };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Create Class</h3>
        <div className="grid gap-3 mb-3">
          <input value={className} onChange={e=>setClassName(e.target.value)} placeholder="Class name e.g. Grade 8 - Science" className="px-3 py-2 bg-dark-800 border border-slate-600 rounded" />
          <select value={subject} onChange={e=>setSubject(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {['Math','Science','Technology','Arts','English'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={teacherId} onChange={e=>setTeacherId(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {teachers.map(t=> (<option key={t.id} value={t.id}>{t.name}</option>))}
          </select>
        </div>
        <button onClick={handleCreateClass} className="btn btn-primary shadow-glow">Create Class</button>
      </div>
      <div className="card border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Assign Teacher / Student</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <select value={classIdAssign} onChange={e=>setClassIdAssign(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {classes.map(c=> (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <select value={teacherId} onChange={e=>setTeacherId(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {teachers.map(t=> (<option key={t.id} value={t.id}>{t.name}</option>))}
          </select>
          <button onClick={handleAssignTeacher} className="btn btn-primary shadow-glow">Assign Teacher</button>
          <select value={studentIdAssign} onChange={e=>setStudentIdAssign(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {students.map(s=> (<option key={s.id} value={s.id}>{s.name}</option>))}
          </select>
          <button onClick={handleAssignStudent} className="btn btn-secondary">Add Student</button>
        </div>
      </div>
    </div>
  );
};

const VerifyUsersPanel = ({ onChange }) => {
  const [pending, setPending] = useState([]);
  useEffect(() => {
    const users = userApi.all();
    setPending(users.filter(u => u.verified === false));
  }, []);

  const verify = (id) => {
    userApi.verify(id, true);
    setPending(prev => prev.filter(p => p.id !== id));
    onChange?.();
  };

  if (!pending.length) return null;
  return (
    <div className="card border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Verify New Users</h3>
      <div className="space-y-2">
        {pending.map(u => (
          <div key={u.id} className="flex items-center justify-between p-3 bg-dark-800 rounded">
            <div>
              <div className="text-white font-medium">{u.name} <span className="text-xs text-slate-400">({u.role})</span></div>
              <div className="text-slate-400 text-sm">{u.email}</div>
            </div>
            <button onClick={()=>verify(u.id)} className="btn btn-primary shadow-glow">Verify</button>
          </div>
        ))}
      </div>
    </div>
  );
};
