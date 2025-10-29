
import { 
  Header, 
  HealthCheck, 
  FetchParagraph, 
  SearchParagraphs, 
  WordFrequency 
} from './components';
import { ColdStartBanner } from './components/ColdStartBanner';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ColdStartBanner />
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            PortCast API Explorer
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Interactive interface to explore and test the PortCast API endpoints. 
            Check health status, fetch paragraphs, search content, and analyze word frequency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <HealthCheck />
            <FetchParagraph />
          </div>
          
          <div className="space-y-8">
            <SearchParagraphs />
            <WordFrequency />
          </div>
        </div>

        <footer className="mt-16 py-8 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
            <p className="mt-1">API Base: https://portcastassignment.onrender.com</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
