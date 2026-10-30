import { useState } from 'react';

export default function GlassTextField({ value, onChange, placeholder, onClear }) {
  const [focused, setFocused] = useState(false);

  return (
    <div 
      className="glass-panel" 
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '12px',
        border: focused ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
        boxShadow: focused ? '0 0 15px rgba(129, 140, 248, 0.25)' : 'none',
        background: 'rgba(255, 255, 255, 0.02)',
        transition: 'all 0.3s ease',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto 30px',
        overflow: 'hidden'
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flexGrow: 1,
          border: 'none',
          background: 'transparent',
          outline: 'none',
          padding: '12px 16px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: '15px'
        }}
      />

      {/* Trailing Clear Icon */}
      {value && (
        <button
          onClick={onClear}
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            outline: 'none'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          Clear
        </button>
      )}
    </div>
  );
}
