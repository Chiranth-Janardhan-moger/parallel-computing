import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LabBoard from './components/LabBoard';
import Toast from './components/Toast';
import experimentsData from './data/experiments.json';
import './App.css';

const CardDetail = lazy(() => import('./components/CardDetail'));

function MainLayout() {
  return <LabBoard />;
}

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (historyRef.current && !historyRef.current.contains(event.target)) {
        setHistoryOpen(false);
      }
    };
    if (historyOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [historyOpen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const copyAllPrograms = () => {
    const combinedCode = experimentsData
      .map((exp) => {
        return `/* ====================================================================
   PROGRAM ${String(exp.number).padStart(2, '0')}: ${exp.title}
   Technology: ${exp.technology}
   File: ${exp.file}
   Compilation: ${exp.compileCommand}
   Execution:   ${exp.runCommand}
   ==================================================================== */

${exp.code}`;
      })
      .join('\n\n\n');

    navigator.clipboard.writeText(combinedCode)
      .then(() => showToast('All 9 Parallel Computing Programs Copied!'))
      .catch((err) => {
        console.error('Failed to copy all programs:', err);
        showToast('Failed to copy programs to clipboard');
      });
  };

  return (
    <div className="app-container" style={{ padding: '20px 0' }}>
      {/* Dynamic Floating Backdrop Orbs */}
      <div className="orb-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Main Core View Area */}
      <main className="container-box fade-in" style={{ flexGrow: '1' }}>
        {/* Top Header Navigation Bar */}
        <header className="portal-header">
          <Link to="/" className="portal-brand" title="Parallel Computing Laboratory Exercises Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
            <span>Parallel Computing Laboratory Exercises</span>
          </Link>

          <div className="portal-header-actions">
            <button 
              onClick={copyAllPrograms} 
              className="glass-btn" 
              title="Copy all 9 lab programs completely to clipboard"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copy All Programs
            </button>

            {/* History Dropdown */}
            <div className="history-menu-container" ref={historyRef}>
              <button 
                type="button"
                className={`glass-btn history-trigger-btn ${historyOpen ? 'active' : ''}`}
                onClick={() => setHistoryOpen((prev) => !prev)}
                title="Course Labs History (INS, ML & Docker)"
                aria-label="Course Labs History"
                aria-expanded={historyOpen}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </button>

              {historyOpen && (
                <div className="history-dropdown-card fade-in">
                  <div className="history-dropdown-header">
                    Course Labs
                  </div>
                  <a 
                    href="https://inslab.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="history-dropdown-item"
                    title="Information and Network Security Lab"
                    onClick={() => setHistoryOpen(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="history-bullet" />
                      <span>INS</span>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>

                  <a 
                    href="https://ml26.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="history-dropdown-item"
                    title="Machine Learning Lab"
                    onClick={() => setHistoryOpen(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="history-bullet" />
                      <span>ML</span>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>

                  <a 
                    href="https://devops26.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="history-dropdown-item"
                    title="DevOps / Docker Lab"
                    onClick={() => setHistoryOpen(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="history-bullet" />
                      <span>Docker</span>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/card/:id" element={<CardDetail />} />
            <Route path="/card/:id/*" element={<CardDetail />} />
            <Route path="/:id" element={<CardDetail />} />
            <Route path="*" element={
              <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                <h2>404 - Workspace Not Found</h2>
                <Link to="/" className="glass-btn" style={{ marginTop: '20px' }}>Return to home</Link>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
