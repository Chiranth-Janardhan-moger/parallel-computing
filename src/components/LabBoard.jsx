import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import experimentsData from '../data/experiments.json';
import GlassTextField from './GlassTextField';
import SetupGuide from './SetupGuide';
import Toast from './Toast';

export default function LabBoard() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'openmp', 'mpi', 'setup'
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const navigate = useNavigate();

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const copyQuickCode = (e, exp) => {
    e.stopPropagation();
    navigator.clipboard.writeText(exp.code)
      .then(() => showToast(`Copied ${exp.file} code`))
      .catch((err) => console.error('Failed to copy', err));
  };

  const copyQuickCommand = (e, exp) => {
    e.stopPropagation();
    const cmd = `${exp.compileCommand}\n${exp.runCommand}`;
    navigator.clipboard.writeText(cmd)
      .then(() => showToast(`Copied compile & run commands for ${exp.file}`))
      .catch((err) => console.error('Failed to copy', err));
  };

  // Filter experiments based on search and category tab
  const filteredExperiments = experimentsData.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.technology.toLowerCase().includes(search.toLowerCase()) ||
      item.file.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'openmp') return item.technology.toLowerCase() === 'openmp';
    if (activeTab === 'mpi') return item.technology.toLowerCase() === 'mpi';
    return true; // 'all'
  });

  const openMPCount = experimentsData.filter(i => i.technology === 'OpenMP').length;
  const mpiCount = experimentsData.filter(i => i.technology === 'MPI').length;

  const openMPList = filteredExperiments.filter(item => item.technology === 'OpenMP');
  const mpiList = filteredExperiments.filter(item => item.technology === 'MPI');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Category Tabs */}
      <div className="filter-tabs-container">
        <button
          className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Programs ({experimentsData.length})
        </button>
        <button
          className={`filter-tab ${activeTab === 'openmp' ? 'active' : ''}`}
          onClick={() => setActiveTab('openmp')}
        >
          OpenMP Shared-Memory ({openMPCount})
        </button>
        <button
          className={`filter-tab ${activeTab === 'mpi' ? 'active' : ''}`}
          onClick={() => setActiveTab('mpi')}
        >
          MPI Message-Passing ({mpiCount})
        </button>
        <button
          className={`filter-tab ${activeTab === 'setup' ? 'active' : ''}`}
          onClick={() => setActiveTab('setup')}
        >
          Lab Setup Guide
        </button>
      </div>

      {/* When Setup Guide tab is active */}
      {activeTab === 'setup' ? (
        <SetupGuide />
      ) : (
        <>
          {/* Global Search Input */}
          <GlassTextField
            value={search}
            onChange={setSearch}
            placeholder="Search by program name, directive (#pragma omp, MPI_Reduce), or file (prog1_matvec.c)..."
            onClear={() => setSearch('')}
          />

          {filteredExperiments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              
              {/* Section 1: OpenMP Programs */}
              {openMPList.length > 0 && (activeTab === 'all' || activeTab === 'openmp') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ 
                      fontSize: '15px', 
                      fontWeight: '600', 
                      color: 'var(--accent-primary)', 
                      textAlign: 'left', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1.2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></span>
                      OpenMP Shared-Memory Programs ({openMPList.length})
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px'
                  }}>
                    {openMPList.map((item) => (
                      <ProgramCard 
                        key={item.id} 
                        item={item} 
                        onNavigate={() => navigate(`/card/${item.id}`)}
                        onCopyCode={(e) => copyQuickCode(e, item)}
                        onCopyCommand={(e) => copyQuickCommand(e, item)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Section 2: MPI Programs */}
              {mpiList.length > 0 && (activeTab === 'all' || activeTab === 'mpi') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ 
                      fontSize: '15px', 
                      fontWeight: '600', 
                      color: '#0f766e', 
                      textAlign: 'left', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1.2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0f766e' }}></span>
                      MPI Distributed-Memory Programs ({mpiList.length})
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '24px'
                  }}>
                    {mpiList.map((item) => (
                      <ProgramCard 
                        key={item.id} 
                        item={item} 
                        onNavigate={() => navigate(`/card/${item.id}`)}
                        onCopyCode={(e) => copyQuickCode(e, item)}
                        onCopyCommand={(e) => copyQuickCommand(e, item)}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Empty State */
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>
                No Laboratory Programs Found
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                No exercises match "{search}". Try searching for terms like "matvec", "reduction", "sections", "mangoes", or "collective".
              </p>
            </div>
          )}
        </>
      )}

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}

function ProgramCard({ item, onNavigate, onCopyCode, onCopyCommand }) {
  const isMPI = item.technology === 'MPI';

  return (
    <div 
      className="glass-card" 
      onClick={onNavigate}
      style={{
        padding: '28px 24px',
        minHeight: '230px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'left',
        gap: '16px'
      }}
    >
      <div>
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(15, 23, 42, 0.06)', paddingBottom: '12px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div className="card-index">
            {String(item.number).padStart(2, '0')}
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span className={`badge-pill ${isMPI ? 'badge-mpi' : 'badge-openmp'}`}>
              {item.technology}
            </span>
            <span className="badge-file">
              {item.file}
            </span>
          </div>
        </div>

        <h3 className="card-title" style={{ marginTop: '0', fontSize: '17px' }}>
          {item.title}
        </h3>

        <p style={{ 
          fontSize: '13px', 
          color: 'var(--text-secondary)', 
          marginTop: '8px',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {item.question}
        </p>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderTop: '1px solid var(--glass-border)', 
        paddingTop: '14px',
        marginTop: '8px'
      }}>
        <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          View Manual & Code
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onCopyCommand}
            title="Copy compile & run commands"
            className="glass-btn"
            style={{ padding: '6px 10px', fontSize: '11px', borderRadius: '8px' }}
          >
            Commands
          </button>
          <button
            onClick={onCopyCode}
            title="Copy full C code"
            className="glass-btn glass-btn-primary"
            style={{ padding: '6px 10px', fontSize: '11px', borderRadius: '8px' }}
          >
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
}
