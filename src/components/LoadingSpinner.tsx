import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-slate-300 border-t-blue-600 dark:border-slate-600 dark:border-t-blue-400 ${sizeClasses[size]} ${className}`} />
  );
};

interface LoadingCardProps {
  message?: string;
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-center space-x-3">
        <LoadingSpinner size="md" />
        <span className="text-slate-600 dark:text-slate-400 font-medium">
          {message}
        </span>
      </div>
    </div>
  );
};

interface EnhancedLoadingProps {
  message?: string;
  submessage?: string;
  duration?: number;
}

export const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({ 
  message = 'Loading...', 
  submessage = 'Please wait while we fetch your data',
  duration 
}) => {
  return (
    <div className="animate-fade-in">
      <div className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-md rounded-2xl p-8 border border-slate-200/60 dark:border-slate-700/60 shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Animated dots loader */}
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
              {message}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {submessage}
            </p>
            {duration && (
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                Expected time: ~{duration}s
              </div>
            )}
          </div>
          
          {/* Progress bar for cold start */}
          {duration && duration > 10 && (
            <div className="w-full max-w-xs">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full animate-pulse" style={{ width: '30%' }}></div>
              </div>
              <p className="text-xs text-center text-amber-600 dark:text-amber-400 mt-2">
                🚀 Cold start in progress...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for cards
export const SkeletonCard: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};