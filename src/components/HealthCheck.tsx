import React, { useState } from 'react';
import { useHealth } from '../hooks/useHealth';
import { EnhancedLoading, LoadingSpinner } from './LoadingSpinner';
import { ErrorCard } from './ErrorCard';
import { ResponseCard, SuccessAnimation } from './SuccessAnimation';

export const HealthCheck: React.FC = () => {
  const { data, loading, error, responseTime, isColdStart, checkHealth } = useHealth();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleHealthCheck = async () => {
    await checkHealth();
    if (!error && data) {
      setShowSuccess(true);
    }
  };

  return (
    <>
      <SuccessAnimation
        show={showSuccess}
        message="Health check completed!"
        responseTime={responseTime || undefined}
        isColdStart={isColdStart}
        onComplete={() => setShowSuccess(false)}
      />
      
      <div className="glass card-hover rounded-2xl p-6 shadow-xl animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center animate-float">
              <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Health Check</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">API status and connectivity</p>
            </div>
          </div>
          
          <button
            onClick={handleHealthCheck}
            disabled={loading}
            className="btn-hover inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Checking...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Check Health
              </>
            )}
          </button>
        </div>

        {loading && (
          <EnhancedLoading
            message="Checking API health..."
            submessage="This may take up to 60 seconds for cold starts"
            duration={isColdStart ? 60 : 5}
          />
        )}

        {error && <ErrorCard error={error} onRetry={checkHealth} />}
        
        {data && (
          <ResponseCard responseTime={responseTime || undefined} isColdStart={isColdStart}>
            <div className="animate-scale-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</span>
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                      data.status === 'healthy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 pulse-success' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {data.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Database</span>
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                      data.database_connected 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 pulse-success' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {data.database_connected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Version</span>
                    <span className="text-lg text-slate-900 dark:text-slate-100 font-mono font-bold">{data.version}</span>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-2">Timestamp</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                      {new Date(data.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ResponseCard>
        )}
      </div>
    </>
  );
};