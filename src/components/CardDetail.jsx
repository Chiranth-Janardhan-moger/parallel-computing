import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import experimentsData from '../data/experiments.json';
import Toast from './Toast';

export default function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prevId, setPrevId] = useState(id);
  const [experiment, setExperiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  if (id !== prevId) {
    setPrevId(id);
    setLoading(true);
  }

  // Find experiment
  useEffect(() => {
    const found = experimentsData.find((item) => String(item.id) === String(id));
    
    const timer = setTimeout(() => {
      if (found) {
        setExperiment(found);
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!experiment) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Exercise Not Found</h2>
        <Link to="/" className="glass-btn" style={{ marginTop: '20px' }}>Back to Laboratory</Link>
      </div>
    );
  }

  const currentIndex = experimentsData.findIndex(item => String(item.id) === String(id));
  const prevExperiment = currentIndex > 0 ? experimentsData[currentIndex - 1] : null;
  const nextExperiment = currentIndex < experimentsData.length - 1 ? experimentsData[currentIndex + 1] : null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(experiment.code)
      .then(() => showToast(`Source code ${experiment.file} copied successfully`))
      .catch((err) => console.error('Failed to copy code:', err));
  };

  const copyCommands = () => {
    const cmds = `${experiment.compileCommand}\n${experiment.runCommand}`;
    navigator.clipboard.writeText(cmds)
      .then(() => showToast('Compile and execute commands copied'))
      .catch((err) => console.error('Failed to copy commands:', err));
  };

  const downloadSourceFile = () => {
    const blob = new Blob([experiment.code], { type: 'text/x-csrc;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', experiment.file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${experiment.file}`);
  };

  const isMPI = experiment.technology === 'MPI';

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Top Controls Bar */}
      <div className="detail-header-controls">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link to="/" className="glass-btn" style={{ minWidth: '44px', justifyContent: 'center', padding: '10px 14px' }} title="Back to Laboratory">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Lab Index</span>
          </Link>

          {/* Quick Prev / Next Buttons */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {prevExperiment && (
              <button 
                onClick={() => navigate(`/card/${prevExperiment.id}`)}
                className="glass-btn" 
                style={{ padding: '8px 12px', fontSize: '12px' }}
                title={`Previous: Exercise ${prevExperiment.number}`}
              >
                ← Ex {prevExperiment.number}
              </button>
            )}
            {nextExperiment && (
              <button 
                onClick={() => navigate(`/card/${nextExperiment.id}`)}
                className="glass-btn" 
                style={{ padding: '8px 12px', fontSize: '12px' }}
                title={`Next: Exercise ${nextExperiment.number}`}
              >
                Ex {nextExperiment.number} →
              </button>
            )}
          </div>
        </div>
        
        {/* Actions: Download, Commands, Copy Code */}
        <div className="detail-copy-actions">
          <button onClick={downloadSourceFile} className="glass-btn" style={{ gap: '6px' }} title="Download .c file">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download {experiment.file}
          </button>
          
          <button onClick={copyCommands} className="glass-btn" style={{ gap: '6px' }} title="Copy Compile & Run commands">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5"></polyline>
              <line x1="12" y1="19" x2="20" y2="19"></line>
            </svg>
            Commands
          </button>

          <button onClick={copyCode} className="glass-btn glass-btn-primary" style={{ gap: '6px' }} title="Copy full C source code">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Code
          </button>
        </div>
      </div>

      {/* Program Header */}
      <div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '8px' }}>
          <span className="badge-pill" style={{ background: 'rgba(37, 99, 235, 0.08)', color: 'var(--accent-primary)' }}>
            BCSL706 · EXERCISE {String(experiment.number).padStart(2, '0')}
          </span>
          <span className={`badge-pill ${isMPI ? 'badge-mpi' : 'badge-openmp'}`}>
            {experiment.technology}
          </span>
          <span className="badge-file">
            {experiment.file}
          </span>
        </div>
        
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: '1.3' }}>
          Program {experiment.number}: {experiment.title}
        </h1>
      </div>

      {/* Aim / Problem Statement */}
      <div className="glass-panel" style={{ 
        padding: '24px', 
        borderLeft: '4px solid var(--accent-primary)'
      }}>
        <h4 style={headingStyle}>Aim</h4>
        <p style={{ color: 'var(--text-primary)', fontSize: '15.5px', marginTop: '8px', lineHeight: '1.6' }}>
          {experiment.question}
        </p>
        
        <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Where to Execute:</span>
          <span style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>{experiment.whereToExecute}</span>
        </div>
      </div>

      {/* Source Code Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={headingStyle}>Source Code ({experiment.file})</h4>
          <button onClick={copyCode} className="glass-btn" style={{ padding: '4px 12px', fontSize: '12px', gap: '6px' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy C Code
          </button>
        </div>

        <div className="glass-panel" style={{
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'var(--code-bg)',
          border: '1px solid var(--glass-border)'
        }}>
          <div style={{
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              {experiment.file} — C Source
            </span>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--accent-primary)', fontWeight: '600' }}>
              {experiment.technology} Directive
            </span>
          </div>

          <pre style={{
            padding: '20px',
            margin: 0,
            overflowX: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '13.5px',
            color: 'var(--code-text)',
            lineHeight: '1.6'
          }}>
            <code>{experiment.code}</code>
          </pre>
        </div>
      </div>

      {/* How to Compile & Execute */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={headingStyle}>How to Compile and Execute</h4>
          <button onClick={copyCommands} className="glass-btn" style={{ padding: '4px 12px', fontSize: '12px', gap: '6px' }}>
            Copy Commands
          </button>
        </div>

        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot dot-red"></span>
            <span className="terminal-dot dot-yellow"></span>
            <span className="terminal-dot dot-green"></span>
            <span className="terminal-title">Linux Terminal (Ubuntu / WSL2)</span>
          </div>
          <pre className="terminal-body" style={{ margin: 0 }}>
            <code>{`# Compile
$ ${experiment.compileCommand}

# Run
$ ${experiment.runCommand}`}</code>
          </pre>
        </div>
      </div>

      {/* Sample Output */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h4 style={headingStyle}>Sample Output</h4>
        <div className="terminal-window">
          <div className="terminal-header">
            <span className="terminal-dot dot-red"></span>
            <span className="terminal-dot dot-yellow"></span>
            <span className="terminal-dot dot-green"></span>
            <span className="terminal-title">program output</span>
          </div>
          <pre className="terminal-body" style={{ margin: 0, color: '#38bdf8' }}>
            <code>{experiment.sampleOutput}</code>
          </pre>
        </div>
      </div>

      {/* Technical Notes / Concept Analysis */}
      <div className="glass-panel" style={{ padding: '22px 24px', background: 'rgba(59, 130, 246, 0.03)' }}>
        <h4 style={headingStyle}>Technical Analysis & Notes</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '8px', lineHeight: '1.6' }}>
          {experiment.note}
        </p>
      </div>

      {/* Result Verification */}
      <div className="glass-panel" style={{ padding: '20px 24px', borderLeft: '4px solid #10b981' }}>
        <h4 style={{ ...headingStyle, color: '#059669' }}>Result</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.5' }}>
          {experiment.result}
        </p>
      </div>

      {/* Bottom Prev / Next Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
        {prevExperiment ? (
          <button onClick={() => navigate(`/card/${prevExperiment.id}`)} className="glass-btn" style={{ gap: '8px' }}>
            <span>←</span>
            <span>Program {prevExperiment.number}: {prevExperiment.shortTitle}</span>
          </button>
        ) : <div></div>}

        {nextExperiment ? (
          <button onClick={() => navigate(`/card/${nextExperiment.id}`)} className="glass-btn glass-btn-primary" style={{ gap: '8px' }}>
            <span>Program {nextExperiment.number}: {nextExperiment.shortTitle}</span>
            <span>→</span>
          </button>
        ) : <div></div>}
      </div>

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}

const headingStyle = {
  fontSize: '14.5px',
  fontWeight: '600',
  color: 'var(--text-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  textAlign: 'left'
};

function SkeletonLoader() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '32px', animation: 'skeletonPulse 1.5s infinite ease-in-out', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="detail-header-controls">
        <div style={{ width: '100px', height: '40px', background: 'var(--glass-border)', borderRadius: '12px' }}></div>
        <div className="detail-copy-actions">
          <div style={{ width: '130px', height: '40px', background: 'var(--glass-border)', borderRadius: '12px' }}></div>
          <div style={{ width: '130px', height: '40px', background: 'var(--glass-border)', borderRadius: '12px' }}></div>
        </div>
      </div>

      <div>
        <div style={{ width: '220px', height: '14px', background: 'var(--glass-border)', borderRadius: '4px', marginBottom: '12px' }}></div>
        <div style={{ width: '80%', height: '36px', background: 'var(--glass-border)', borderRadius: '6px' }}></div>
      </div>

      <div style={{ padding: '24px', background: 'var(--glass-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ width: '120px', height: '16px', background: 'rgba(15,23,42,0.1)', borderRadius: '4px' }}></div>
        <div style={{ width: '90%', height: '14px', background: 'rgba(15,23,42,0.06)', borderRadius: '4px' }}></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '160px', height: '16px', background: 'var(--glass-border)', borderRadius: '4px' }}></div>
        <div style={{ width: '100%', height: '240px', background: 'var(--glass-border)', borderRadius: '12px' }}></div>
      </div>

      <style>{`
        @keyframes skeletonPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
