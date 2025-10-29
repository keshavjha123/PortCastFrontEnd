import React, { useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorCard } from './ErrorCard';

export const SearchParagraphs: React.FC = () => {
  const { data, loading, error, search, reset } = useSearch();
  const [words, setWords] = useState<string>('');
  const [operator, setOperator] = useState<'and' | 'or'>('or');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!words.trim()) return;
    
    const wordArray = words.split(',').map(w => w.trim()).filter(w => w.length > 0);
    if (wordArray.length === 0) return;
    
    search({ words: wordArray, operator });
  };

  const handleReset = () => {
    setWords('');
    reset();
  };

  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Search Paragraphs</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Find paragraphs containing specific words</p>
          </div>
        </div>
        
        {data && (
          <button
            onClick={handleReset}
            className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors duration-200"
          >
            Clear Results
          </button>
        )}
      </div>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Search Words (comma-separated)
          </label>
          <input
            type="text"
            value={words}
            onChange={(e) => setWords(e.target.value)}
            placeholder="e.g. yachts, sweatshops"
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Search Operator
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="or"
                checked={operator === 'or'}
                onChange={(e) => setOperator(e.target.value as 'or')}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">OR (any word)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="and"
                checked={operator === 'and'}
                onChange={(e) => setOperator(e.target.value as 'and')}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">AND (all words)</span>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !words.trim()}
          className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Searching...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Paragraphs
            </>
          )}
        </button>
      </form>

      {error && <ErrorCard error={error} onRetry={() => {
        if (words.trim()) {
          const wordArray = words.split(',').map(w => w.trim()).filter(w => w.length > 0);
          if (wordArray.length > 0) {
            search({ words: wordArray, operator });
          }
        }
      }} />}
      
      {data && (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Found {data.total_count} paragraph{data.total_count !== 1 ? 's' : ''}
              </span>
              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Terms:</span>
                <div className="flex space-x-1">
                  {data.search_terms.map((term, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                      {term}
                    </span>
                  ))}
                </div>
                <span className="uppercase font-semibold">{data.operator}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {data.paragraphs.map((paragraph) => (
              <div key={paragraph.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                    Paragraph #{paragraph.id}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(paragraph.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {paragraph.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};