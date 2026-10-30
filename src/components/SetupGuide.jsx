import { useState } from 'react';
import labInfo from '../data/labInfo.json';
import Toast from './Toast';

export default function SetupGuide() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text)
      .then(() => showToast(label ? `${label} copied` : 'Copied to clipboard'))
      .catch((err) => console.error('Copy failed', err));
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      
      {/* Course Overview Banner */}
      <div className="glass-panel" style={{ padding: '28px', borderLeft: '4px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
          <span className="badge-pill badge-openmp">{labInfo.courseCode}</span>
          <span className="badge-pill" style={{ background: 'rgba(15, 23, 42, 0.05)', color: '#475569' }}>{labInfo.scheme}</span>
          <span className="badge-pill" style={{ background: 'rgba(15, 23, 42, 0.05)', color: '#475569' }}>Credits: {labInfo.credits.credits} ({labInfo.credits.hours})</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
          {labInfo.courseTitle}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          {labInfo.department} · {labInfo.institution} ({labInfo.affiliation})
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
          CIE Marks: {labInfo.credits.cie} | SEE Marks: {labInfo.credits.see} | Exam Hours: {labInfo.credits.examHours}
        </p>
      </div>

      {/* Course Objectives and Outcomes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Objectives */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></span>
            Course Objectives
          </h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {labInfo.objectives.map((obj, idx) => (
              <li key={idx} style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Outcomes */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></span>
            Course Outcomes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {labInfo.outcomes.map((co) => (
              <div key={co.code} style={{ padding: '10px 14px', background: 'rgba(59, 130, 246, 0.04)', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <strong style={{ color: 'var(--accent-primary)', fontSize: '13px', display: 'block', marginBottom: '2px' }}>{co.code}</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13.5px' }}>{co.desc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Environment Setup Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></span>
            Lab Environment Setup — Where & How to Execute
          </h3>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Ubuntu / WSL2 / Linux VM Recommended
          </span>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.6' }}>
          All programs in this manual are written in C and are meant to be compiled and executed on a Linux terminal 
          (Ubuntu is recommended). This can be a native Ubuntu installation, a Virtual Machine (VirtualBox/VMware running Ubuntu), 
          or WSL2 (Windows Subsystem for Linux) on a Windows machine. A plain code editor (e.g. VS Code, gedit, nano, vim) is enough — no IDE is required.
        </p>

        {labInfo.setupGuide.map((step) => {
          const commandText = step.commands.join('\n');
          return (
            <div key={step.step} className="glass-panel" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Step {step.step}: {step.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '4px' }}>
                    {step.desc}
                  </p>
                </div>
                <button
                  onClick={() => copyText(commandText, `Step ${step.step} commands`)}
                  className="glass-btn"
                  style={{ padding: '6px 14px', fontSize: '12px', gap: '6px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy Commands
                </button>
              </div>

              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-dot dot-red"></span>
                  <span className="terminal-dot dot-yellow"></span>
                  <span className="terminal-dot dot-green"></span>
                  <span className="terminal-title">bash terminal</span>
                </div>
                <pre className="terminal-body" style={{ margin: 0 }}>
                  <code>{commandText}</code>
                </pre>
              </div>
            </div>
          );
        })}
      </div>

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
