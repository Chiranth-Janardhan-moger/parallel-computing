import { Routes, Route, Link } from 'react-router-dom';
import LabBoard from './components/LabBoard';
import CardDetail from './components/CardDetail';
import './App.css';

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero / Header Section */}
      <header style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '12px',
        textAlign: 'center',
        padding: '10px 0 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="badge-pill badge-openmp" style={{ fontSize: '12px', padding: '5px 12px' }}>
            BCSL706
          </span>
          <span className="badge-pill" style={{ background: 'rgba(15, 23, 42, 0.05)', color: '#475569', fontSize: '12px', padding: '5px 12px' }}>
            Semester VII · CBCS 2022 Scheme
          </span>
          <span className="badge-pill" style={{ background: 'rgba(15, 23, 42, 0.05)', color: '#475569', fontSize: '12px', padding: '5px 12px' }}>
            Credits: 1 · Exam: 3 hrs
          </span>
        </div>

        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          color: 'var(--text-primary)', 
          letterSpacing: '-0.8px',
          margin: '4px 0'
        }}>
          Parallel Computing Laboratory
        </h1>

        <p style={{ 
          fontSize: '16px', 
          color: 'var(--text-secondary)', 
          maxWidth: '750px',
          lineHeight: '1.5'
        }}>
          Comprehensive reference portal for OpenMP shared-memory directives and MPI message-passing routines.
          BMS Institute of Technology & Management · Department of Computer Science & Engineering.
        </p>
      </header>

      {/* Main Board */}
      <LabBoard />
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container" style={{ padding: '24px 0' }}>
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
          <Route path="*" element={
            <div className="glass-panel" style={{ padding: '50px 30px', textAlign: 'center', maxWidth: '500px', margin: '40px auto' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>404 - Page Not Found</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
                The requested laboratory exercise or page does not exist.
              </p>
              <Link to="/" className="glass-btn glass-btn-primary">Return to Laboratory</Link>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '30px 20px 10px', 
        fontSize: '13px', 
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: '50px'
      }}>
        <p>BCSL706 Parallel Computing Laboratory · Department of Computer Science & Engineering</p>
        <p style={{ marginTop: '4px', opacity: 0.8 }}>BMS Institute of Technology & Management (Autonomous Institute under VTU)</p>
      </footer>
    </div>
  );
}
