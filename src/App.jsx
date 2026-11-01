import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LabBoard from './components/LabBoard';
import CardDetail from './components/CardDetail';
import Toast from './components/Toast';
import experimentsData from './data/experiments.json';
import './App.css';

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '10px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'inline-block' }}></span>
        Parallel Computing Laboratory Exercises
      </h2>
      <LabBoard />
    </div>
  );
}

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

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
          <Link to="/" className="portal-brand" title="PC Lab Portal Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
              <line x1="6" y1="6" x2="6.01" y2="6"></line>
              <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
            <span>PC Lab</span>
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

            <a 
              href="https://inslab26.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-btn glass-btn-primary" 
              title="Open Information and Network Security Lab Portal"
            >
              <span>INS Lab</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>

            {/* History Dropdown */}
            <div 
              className="history-menu-container"
              onMouseEnter={() => setHistoryOpen(true)}
              onMouseLeave={() => setHistoryOpen(false)}
            >
              <button 
                type="button"
                className={`glass-btn history-trigger-btn ${historyOpen ? 'active' : ''}`}
                onClick={() => setHistoryOpen(!historyOpen)}
                title="Previous Course Labs (ML & Docker)"
                aria-label="Previous Course Labs"
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
                    href="https://ml26.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="history-dropdown-item"
                    title="Machine Learning Lab"
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
      </main>

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
