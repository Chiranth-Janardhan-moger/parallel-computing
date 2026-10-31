import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import experimentsData from '../data/experiments.json';
import Toast from './Toast';

export default function CardDetail() {
  const { id } = useParams();
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Synchronous lookup: handles "4", "04", number 4, or filename like "prog4"
  const rawId = id ? String(id).trim() : '';
  const cleanNum = rawId.replace(/^0+/, '') || '0';
  const experiment = experimentsData.find(
    (item) =>
      String(item.id) === rawId ||
      String(item.id) === cleanNum ||
      Number(item.number) === Number(rawId) ||
      item.file.toLowerCase().includes(rawId.toLowerCase())
  );

  if (!experiment) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '40px auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px' }}>Exercise Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
          No exercise matches identifier "{id}". Valid numbers are 1 to 9.
        </p>
        <Link to="/" className="glass-btn glass-btn-primary">Return to Laboratory</Link>
      </div>
    );
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(experiment.code)
      .then(() => showToast('C Code Copied Successfully'))
      .catch((err) => console.error('Failed to copy code:', err));
  };

  const copyCompileCommand = () => {
    navigator.clipboard.writeText(`${experiment.compileCommand}\n${experiment.runCommand}`)
      .then(() => showToast('Commands Copied Successfully'))
      .catch((err) => console.error('Failed to copy command:', err));
  };

  return (
    <div className="fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Top Header Controls */}
      <div className="detail-header-controls">
        <Link to="/" className="glass-btn" title="Back to Home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={copyCompileCommand} className="glass-btn" title="Copy compile & run commands">
            Copy Commands
          </button>
          <button onClick={copyCode} className="glass-btn glass-btn-primary" title="Copy full C source code">
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
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Program {String(experiment.number).padStart(2, '0')} · {experiment.technology}
        </span>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', marginTop: '4px' }}>
          {experiment.title}
        </h1>
      </div>

      {/* Aim / Problem Statement */}
      <div style={{ 
        padding: '20px', 
        background: 'rgba(59, 130, 246, 0.04)', 
        borderRadius: '14px', 
        border: '1px solid rgba(59, 130, 246, 0.1)',
        borderLeft: '4px solid var(--accent-primary)'
      }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--accent-primary)' }}>
          Problem Statement
        </h4>
        <p style={{ color: 'var(--text-primary)', fontSize: '15px', marginTop: '6px', lineHeight: '1.6' }}>
          {experiment.question}
        </p>
      </div>

      {/* C Source Code */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-secondary)' }}>
            Source Code ({experiment.file})
          </h4>
          <button onClick={copyCode} className="glass-btn" style={{ padding: '3px 10px', fontSize: '11px' }}>
            Copy
          </button>
        </div>

        <div className="glass-panel" style={{
          borderRadius: '10px',
          overflow: 'hidden',
          background: 'var(--code-bg)',
          border: '1px solid var(--glass-border)'
        }}>
          <pre style={{
            padding: '16px',
            margin: 0,
            overflowX: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--code-text)',
            lineHeight: '1.55'
          }}>
            <code>{experiment.code}</code>
          </pre>
        </div>
      </div>

      {/* Compile and Run Commands */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-secondary)' }}>
          Compile and Run
        </h4>
        <div className="glass-panel" style={{
          padding: '14px 18px',
          background: 'var(--code-bg)',
          borderRadius: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--code-text)',
          border: '1px solid var(--glass-border)'
        }}>
          <div style={{ userSelect: 'all', marginBottom: '4px' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>$ </span>{experiment.compileCommand}
          </div>
          <div style={{ userSelect: 'all' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>$ </span>{experiment.runCommand}
          </div>
        </div>
      </div>

      {/* Sample Output */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-secondary)' }}>
          Output
        </h4>
        <div className="glass-panel" style={{
          padding: '16px',
          background: 'rgba(15, 23, 42, 0.04)',
          borderRadius: '10px',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          color: 'var(--text-primary)',
          border: '1px solid var(--glass-border)',
          overflowX: 'auto',
          whiteSpace: 'pre'
        }}>
          <code>{experiment.sampleOutput}</code>
        </div>
      </div>

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
