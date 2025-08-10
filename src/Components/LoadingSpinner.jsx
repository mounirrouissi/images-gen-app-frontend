import React from 'react';

const LoadingSpinner = ({ message = "Creating Magic..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Main spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-pink-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
      
      {/* Floating dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
      
      {/* Message */}
      <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
        {message}
      </p>
      
      {/* Sparkles */}
      <div className="flex space-x-4">
        <span className="text-2xl animate-sparkle">✨</span>
        <span className="text-2xl animate-sparkle" style={{animationDelay: '0.5s'}}>🌟</span>
        <span className="text-2xl animate-sparkle" style={{animationDelay: '1s'}}>💫</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;