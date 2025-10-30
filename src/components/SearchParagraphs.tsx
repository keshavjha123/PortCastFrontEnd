import React, { useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorCard } from './ErrorCard';

export const SearchParagraphs: React.FC = () => {
  const { data, loading, error, search, reset } = useSearch();
  const [words, setWords] = useState<string>('');
  const [operator, setOperator] = useState<'and' | 'or'>('or');

  // Function to highlight search terms in text
  const highlightText = (text: string, searchTerms: string[]) => {
    if (!searchTerms || searchTerms.length === 0) return text;
    
    // Create a regex pattern that matches any of the search terms (case-insensitive)
    const pattern = new RegExp(`(${searchTerms.map(term => 
      term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special regex characters
    ).join('|')})`, 'gi');
    
    // Split the text by the pattern and wrap matches with highlight spans
    const parts = text.split(pattern);
    
    return parts.map((part, index) => {
      // Check if this part matches any search term (case-insensitive)
      const isMatch = searchTerms.some(term => 
        part.toLowerCase() === term.toLowerCase()
      );
      
      if (isMatch) {
        return (
          <span 
            key={index} 
            className="relative bg-gradient-to-r from-yellow-300 to-amber-300 dark:from-yellow-500/60 dark:to-amber-500/60 text-yellow-900 dark:text-yellow-100 px-2 py-0.5 rounded-md font-semibold shadow-sm border border-yellow-400/30 dark:border-yellow-600/30 animate-pulse"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

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
    <div className="bg-gradient-to-br from-white/80 to-purple-50/50 dark:from-slate-800/80 dark:to-purple-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-200/30 dark:border-purple-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Search Paragraphs
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
              Discover content with intelligent keyword matching
            </p>
          </div>
        </div>
        
        {data && (
          <button
            onClick={handleReset}
            className="group relative px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear Results</span>
            </span>
          </button>
        )}
      </div>

      {/* Search Form */}
      <div className="bg-white/50 dark:bg-slate-900/30 rounded-2xl p-6 border border-purple-100 dark:border-purple-800/50 mb-8 backdrop-blur-sm">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>Search Keywords</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={words}
                onChange={(e) => setWords(e.target.value)}
                placeholder="Enter keywords separated by commas (e.g. innovation, technology, future)"
                className="w-full px-4 py-3 pr-12 border-2 border-purple-200 dark:border-purple-700 rounded-xl bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Search Logic</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="group relative">
                <input
                  type="radio"
                  value="or"
                  checked={operator === 'or'}
                  onChange={(e) => setOperator(e.target.value as 'or')}
                  className="sr-only"
                />
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  operator === 'or' 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    operator === 'or' ? 'border-purple-500' : 'border-slate-400'
                  }`}>
                    {operator === 'or' && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">OR</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Any keyword</div>
                  </div>
                </div>
              </label>
              
              <label className="group relative">
                <input
                  type="radio"
                  value="and"
                  checked={operator === 'and'}
                  onChange={(e) => setOperator(e.target.value as 'and')}
                  className="sr-only"
                />
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  operator === 'and' 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-md' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    operator === 'and' ? 'border-purple-500' : 'border-slate-400'
                  }`}>
                    {operator === 'and' && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">AND</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">All keywords</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || !words.trim()}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center space-x-3">
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="text-white" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search Paragraphs</span>
                </>
              )}
            </div>
          </button>
        </form>
      </div>

      {error && <ErrorCard error={error} onRetry={() => {
        if (words.trim()) {
          const wordArray = words.split(',').map(w => w.trim()).filter(w => w.length > 0);
          if (wordArray.length > 0) {
            search({ words: wordArray, operator });
          }
        }
      }} />}
      
      {/* Results Section */}
      {data && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          {/* Results Summary */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-700/50 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-bold text-green-800 dark:text-green-300">
                    {data.total_count} Result{data.total_count !== 1 ? 's' : ''} Found
                  </span>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Matching paragraphs discovered
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Keywords:</span>
                  <div className="flex flex-wrap gap-2">
                    {data.search_terms.map((term, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Logic:</span>
                  <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-bold uppercase">
                    {data.operator}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Grid */}
          <div className="grid gap-6">
            {data.paragraphs.map((paragraph, index) => (
              <div 
                key={paragraph.id} 
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Paragraph Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      #{paragraph.id}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Paragraph {paragraph.id}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{new Date(paragraph.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Paragraph Content */}
                <div className="relative">
                  <div className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent pr-2">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {highlightText(paragraph.text, data.search_terms)}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white/80 dark:from-slate-800/80 to-transparent pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};