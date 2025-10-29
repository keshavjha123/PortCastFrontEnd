import React, { useState, useEffect } from 'react';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  responseTime?: number;
  isColdStart?: boolean;
  onComplete?: () => void;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  show,
  message = 'Success!',
  responseTime,
  isColdStart,
  onComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 shadow-lg backdrop-blur-sm max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-800 dark:text-green-200">
              {message}
            </p>
            
            {responseTime && (
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-green-600 dark:text-green-400">
                  ⚡ {responseTime}ms
                </span>
                {isColdStart && (
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                    🚀 Cold Start
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResponseCardProps {
  children: React.ReactNode;
  responseTime?: number;
  isColdStart?: boolean;
  className?: string;
}

export const ResponseCard: React.FC<ResponseCardProps> = ({
  children,
  responseTime,
  isColdStart,
  className = ''
}) => {
  return (
    <div className={`animate-fade-in ${className}`}>
      <div className="bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl overflow-hidden">
        {/* Response metadata header */}
        {responseTime && (
          <div className="px-4 py-2 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="text-slate-600 dark:text-slate-400">
                  Response time: <span className="font-mono font-medium">{responseTime}ms</span>
                </span>
                {isColdStart && (
                  <span className="inline-flex items-center px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full">
                    🚀 Cold Start Detected
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 dark:text-green-400 font-medium">Live</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};