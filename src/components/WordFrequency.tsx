import React from 'react';
import { useWordFrequency } from '../hooks/useWordFrequency';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorCard } from './ErrorCard';

export const WordFrequency: React.FC = () => {
  const { data, loading, error, getWordFrequency } = useWordFrequency();

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Word Frequency</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Most frequent words with definitions</p>
          </div>
        </div>
        
        <button
          onClick={getWordFrequency}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Get Frequency
            </>
          )}
        </button>
      </div>

      {error && <ErrorCard error={error} onRetry={getWordFrequency} />}
      
      {data && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-orange-700 dark:text-orange-400">
                {data.message}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Analyzed {data.total_paragraphs_analyzed} paragraphs
              </span>
            </div>
          </div>
          
          <div className="grid gap-3">
            {data.words.map((wordData, index) => (
              <div 
                key={wordData.word} 
                className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-900/40 rounded-full text-sm font-bold text-orange-700 dark:text-orange-300">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">
                        {wordData.word}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-orange-600 dark:text-orange-400">
                        <span className="font-medium">{wordData.part_of_speech}</span>
                        <span>•</span>
                        <span className="font-mono">{wordData.pronunciation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 text-sm font-bold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                      {wordData.frequency}x
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {wordData.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};