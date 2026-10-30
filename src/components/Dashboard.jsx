import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [load, setLoad] = useState(42);
  const [activeContainers, setActiveContainers] = useState(14);
  const [successRate, setSuccessRate] = useState(94.2);

  // Simulate subtle real-time fluctuations to make the dashboard feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      setLoad((prev) => {
        const next = prev + (Math.random() * 6 - 3);
        return Math.min(Math.max(Math.round(next), 20), 80);
      });
      if (Math.random() > 0.8) {
        setActiveContainers((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
      }
      if (Math.random() > 0.9) {
        setSuccessRate((prev) => {
          const next = prev + (Math.random() * 2 - 1);
          return Math.min(Math.max(parseFloat(next.toFixed(1)), 88.0), 99.9);
        });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bento-grid">
      {/* Metric 1: CPU Activity / Load */}
      <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            System Load
          </span>
          <span style={{ fontSize: '20px' }}>⚡</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '36px', fontWeight: '600', color: 'var(--text-primary)' }}>{load}%</span>
          <span style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: '500' }}>Live</span>
        </div>
        {/* Simple live progress indicator */}
        <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '3px', marginTop: '16px', overflow: 'hidden' }}>
          <div style={{ width: `${load}%`, height: '100%', backgroundColor: 'var(--accent-primary)', borderRadius: '3px', transition: 'width 1s ease' }}></div>
        </div>
      </div>

      {/* Metric 2: Containers Online */}
      <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Containers Active
          </span>
          <span style={{ fontSize: '20px' }}>🐳</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '36px', fontWeight: '600', color: 'var(--text-primary)' }}>{activeContainers}</span>
          <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '500' }}>Running</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
          Docker daemon online & responsive
        </p>
      </div>

      {/* Metric 3: CI/CD Pipeline Build Success */}
      <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            CI/CD Success Rate
          </span>
          <span style={{ fontSize: '20px' }}>⚙️</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '36px', fontWeight: '600', color: 'var(--text-primary)' }}>{successRate}%</span>
          <span style={{ fontSize: '12px', color: 'var(--accent-secondary)', fontWeight: '500' }}>Passing</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
          Jenkins build status healthy
        </p>
      </div>

      {/* Metric 4: Static Quality Analysis Code Status */}
      <div className="glass-panel" style={{ gridColumn: 'span 3', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Code Quality Gate
          </span>
          <span style={{ fontSize: '20px' }}>🟢</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '36px', fontWeight: '600', color: 'var(--text-primary)' }}>PASSED</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
          SonarQube Quality Gate active
        </p>
      </div>

      {/* System Activity Chart widget */}
      <div className="glass-panel" style={{ gridColumn: 'span 12', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)' }}>System Activity Log</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automated pipeline trigger requests over time</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', display: 'inline-block' }}></span>
              Builds
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)', display: 'inline-block' }}></span>
              Analysis
            </span>
          </div>
        </div>

        {/* Embedded SVG Area Chart */}
        <div style={{ width: '100%', height: '140px', position: 'relative' }}>
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="indigo-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0"/>
              </linearGradient>
              <linearGradient id="purple-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.0"/>
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="30" x2="1000" y2="30" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            <line x1="0" y1="60" x2="1000" y2="60" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            <line x1="0" y1="90" x2="1000" y2="90" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />

            {/* Area path for Builds */}
            <path 
              d="M 0 120 Q 100 80, 200 95 T 400 45 T 600 65 T 800 25 T 1000 35 L 1000 120 Z" 
              fill="url(#indigo-gradient)" 
            />
            {/* Stroke path for Builds */}
            <path 
              d="M 0 120 Q 100 80, 200 95 T 400 45 T 600 65 T 800 25 T 1000 35" 
              fill="none" 
              stroke="var(--accent-primary)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />

            {/* Area path for Analysis */}
            <path 
              d="M 0 120 Q 150 90, 300 70 T 600 50 T 900 80 T 1000 60 L 1000 120 Z" 
              fill="url(#purple-gradient)" 
            />
            {/* Stroke path for Analysis */}
            <path 
              d="M 0 120 Q 150 90, 300 70 T 600 50 T 900 80 T 1000 60" 
              fill="none" 
              stroke="var(--accent-secondary)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              strokeLinecap="round" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
