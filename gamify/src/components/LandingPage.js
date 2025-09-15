import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = (userType) => {
    navigate('/login', { state: { userType } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Realistic Stars - Better Distribution */}
        <div className="absolute top-16 left-8 w-4 h-4 animate-twinkle opacity-70">
          <svg className="w-full h-full text-yellow-300 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-36 left-1/3 w-3 h-3 animate-twinkle opacity-50" style={{animationDelay: '1s'}}>
          <svg className="w-full h-full text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-56 left-1/4 w-3.5 h-3.5 animate-twinkle opacity-60" style={{animationDelay: '2s'}}>
          <svg className="w-full h-full text-blue-300 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-24 right-32 w-2.5 h-2.5 animate-twinkle opacity-45" style={{animationDelay: '0.5s'}}>
          <svg className="w-full h-full text-purple-300 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-44 right-12 w-3 h-3 animate-twinkle opacity-55" style={{animationDelay: '1.5s'}}>
          <svg className="w-full h-full text-green-300 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        
        {/* Realistic Rockets - Repositioned to avoid overlap */}
        <div className="absolute top-28 right-8 w-12 h-12 opacity-80 animate-float-rocket">
          <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 24 24" fill="none">
            {/* Rocket Body */}
            <path d="M12 2L8 8H16L12 2Z" fill="#ff6b35" stroke="#e55a2b" strokeWidth="0.5"/>
            <path d="M8 8H16L14 20H10L8 8Z" fill="#ff6b35" stroke="#e55a2b" strokeWidth="0.5"/>
            {/* Rocket Fins */}
            <path d="M8 8L6 12L8 16L8 8Z" fill="#ff4757" stroke="#e53e3e" strokeWidth="0.5"/>
            <path d="M16 8L18 12L16 16L16 8Z" fill="#ff4757" stroke="#e53e3e" strokeWidth="0.5"/>
            {/* Rocket Window */}
            <circle cx="12" cy="10" r="2" fill="#74b9ff" stroke="#0984e3" strokeWidth="0.5"/>
            {/* Rocket Flame */}
            <path d="M10 20L12 24L14 20H10Z" fill="#fdcb6e" stroke="#e17055" strokeWidth="0.5"/>
          </svg>
        </div>
        
        <div className="absolute top-52 left-12 w-14 h-14 opacity-75 animate-float-rocket" style={{animationDelay: '2s'}}>
          <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 24 24" fill="none">
            {/* Rocket Body */}
            <path d="M12 2L8 8H16L12 2Z" fill="#74b9ff" stroke="#0984e3" strokeWidth="0.5"/>
            <path d="M8 8H16L14 20H10L8 8Z" fill="#74b9ff" stroke="#0984e3" strokeWidth="0.5"/>
            {/* Rocket Fins */}
            <path d="M8 8L6 12L8 16L8 8Z" fill="#0984e3" stroke="#2d3436" strokeWidth="0.5"/>
            <path d="M16 8L18 12L16 16L16 8Z" fill="#0984e3" stroke="#2d3436" strokeWidth="0.5"/>
            {/* Rocket Window */}
            <circle cx="12" cy="10" r="2" fill="#00b894" stroke="#00a085" strokeWidth="0.5"/>
            {/* Rocket Flame */}
            <path d="M10 20L12 24L14 20H10Z" fill="#fdcb6e" stroke="#e17055" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="text-center py-16">
        <div className="mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-7xl font-black text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 animate-pulse">i</span>Knowledge
          </h1>
          <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-emerald-200 mb-6 font-extrabold tracking-wide">
            Learn. Practice. Master.
          </p>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-semibold">
            🚀 Interactive learning platform with bite-sized lessons, hands-on practice, and personalized progress tracking.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:-translate-y-2 border border-emerald-200">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-emerald-800 mb-3 tracking-wide">Interactive Lessons</h3>
            <p className="text-emerald-700 leading-relaxed font-semibold">Learn with hands-on exercises and real-time feedback</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-blue-800 mb-3 tracking-wide">Progress Tracking</h3>
            <p className="text-blue-700 leading-relaxed font-semibold">Track your learning journey with detailed analytics</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-2 border border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-purple-800 mb-3 tracking-wide">Offline Learning</h3>
            <p className="text-purple-700 leading-relaxed font-semibold">Continue learning even without internet connection</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-2 border border-orange-200">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-orange-800 mb-3 tracking-wide">Achievements</h3>
            <p className="text-orange-700 leading-relaxed font-semibold">Earn badges and celebrate your learning milestones</p>
          </div>
        </div>
      </div>

      {/* Login Portals */}
      <div className="container mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-4 tracking-wide">Choose Your Learning Path</h2>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-emerald-200 font-bold">Get started with personalized learning experiences</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Student Login */}
          <div className="group relative bg-gradient-to-br from-emerald-50 to-white backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-emerald-200/50 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-emerald-50/20 opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-500">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4 tracking-wide group-hover:text-emerald-700 transition-colors duration-300">Student</h3>
              <p className="text-gray-700 mb-8 leading-relaxed font-semibold group-hover:text-gray-800 transition-colors duration-300">
                Access interactive lessons, track your progress, and earn achievements as you learn.
              </p>
              <button
                onClick={() => handleLoginClick('student')}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 relative overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Start Learning</span>
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Teacher Login */}
          <div className="group relative bg-gradient-to-br from-blue-50 to-white backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-blue-200/50 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-50/20 opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-500">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4 tracking-wide group-hover:text-blue-700 transition-colors duration-300">Teacher</h3>
              <p className="text-gray-700 mb-8 leading-relaxed font-semibold group-hover:text-gray-800 transition-colors duration-300">
                Create engaging content, manage your classroom, and monitor student progress.
              </p>
              <button
                onClick={() => handleLoginClick('teacher')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 relative overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Manage Classes</span>
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* School Admin Login */}
          <div className="group relative bg-gradient-to-br from-purple-50 to-white backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-purple-200/50 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-purple-50/20 opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-500">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-gray-800 mb-4 tracking-wide group-hover:text-purple-700 transition-colors duration-300">Administrator</h3>
              <p className="text-gray-700 mb-8 leading-relaxed font-semibold group-hover:text-gray-800 transition-colors duration-300">
                Oversee school operations, manage users, and access comprehensive analytics.
              </p>
              <button
                onClick={() => handleLoginClick('admin')}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 relative overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Admin Dashboard</span>
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">iKnowledge</span>
          </div>
          <p className="text-blue-200 mb-4">
            Empowering education through interactive learning
          </p>
          <p className="text-blue-300 text-sm">
            © 2024 iKnowledge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;