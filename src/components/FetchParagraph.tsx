import React from 'react';
import { useFetchParagraph } from '../hooks/useFetchParagraph';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorCard } from './ErrorCard';

export const FetchParagraph: React.FC = () => {
  const { data, loading, error, fetchParagraph } = useFetchParagraph();

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Fetch Paragraph</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Get a random paragraph from the API</p>
          </div>
        </div>
        
        <button
          onClick={fetchParagraph}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Fetching...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Fetch Paragraph
            </>
          )}
        </button>
      </div>

      {error && <ErrorCard error={error} onRetry={fetchParagraph} />}
      
      {data && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                {data.message}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ID: {data.paragraph.id}
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Created: {new Date(data.paragraph.created_at).toLocaleString()}
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Generated Text:</h3>
            <div className="max-h-64 overflow-y-auto">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {data.paragraph.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};