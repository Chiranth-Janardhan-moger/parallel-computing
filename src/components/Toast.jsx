import { useEffect } from 'react';

export default function Toast({ message, visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      padding: '12px 24px',
      background: 'rgba(16, 185, 129, 0.9)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: '#ffffff',
      fontWeight: '500',
      fontSize: '14px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      animation: 'slideUpFade 0.3s ease-out',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span>{message}</span>
      <style>{`
        @keyframes slideUpFade {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
