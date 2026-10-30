import { useState, useEffect } from 'react';

export default function TransparencyController() {
  const [blur, setBlur] = useState(20);
  const [borderAlpha, setBorderAlpha] = useState(0.15);
  const [isLight, setIsLight] = useState(true);
  const [reduceTrans, setReduceTrans] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (reduceTrans) {
      root.style.setProperty('--glass-blur-val', '0px');
      root.style.setProperty('--glass-border-alpha-val', '0.35');
      root.style.setProperty('--glass-bg-alpha-val', '0.95');
    } else {
      root.style.setProperty('--glass-blur-val', `${blur}px`);
      root.style.setProperty('--glass-border-alpha-val', `${borderAlpha}`);
      root.style.setProperty('--glass-bg-alpha-val', isLight ? '0.65' : '0.25');
    }
  }, [blur, borderAlpha, reduceTrans, isLight]);

  // Synchronize the body class list with the theme state
  useEffect(() => {
    const body = document.body;
    if (isLight) {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight(prev => !prev);
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>System Visual Settings</h3>
        <button 
          onClick={toggleTheme} 
          className="glass-btn" 
          style={{ padding: '6px 12px', fontSize: '13px' }}
        >
          {isLight ? '🌙 Cosmic Dark' : '☀️ Premium Light'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Glass Blur:</span>
          <span>{reduceTrans ? 'Disabled' : `${blur}px`}</span>
        </label>
        <input 
          type="range" 
          min="0" 
          max="40" 
          value={blur} 
          disabled={reduceTrans}
          onChange={(e) => setBlur(parseInt(e.target.value))}
          style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Border Opacity:</span>
          <span>{reduceTrans ? 'High Contrast' : borderAlpha}</span>
        </label>
        <input 
          type="range" 
          min="0.05" 
          max="0.80" 
          step="0.05"
          value={borderAlpha} 
          disabled={reduceTrans}
          onChange={(e) => setBorderAlpha(parseFloat(e.target.value))}
          style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input 
          type="checkbox" 
          id="reduce-trans-check"
          checked={reduceTrans}
          onChange={(e) => setReduceTrans(e.target.checked)}
          style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer', width: '16px', height: '16px' }}
        />
        <label htmlFor="reduce-trans-check" style={{ fontSize: '13px', color: 'var(--text-primary)', cursor: 'pointer' }}>
          Reduce Transparency (A11y High Contrast)
        </label>
      </div>
    </div>
  );
}
