import { Routes, Route, Link } from 'react-router-dom';
import LabBoard from './components/LabBoard';
import CardDetail from './components/CardDetail';
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
    </div>
  );
}
