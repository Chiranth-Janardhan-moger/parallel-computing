import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import experimentsData from '../data/experiments.json';
import GlassTextField from './GlassTextField';

export default function LabBoard() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Search filtering logic (checks title, shortTitle, or question content)
  const filteredExperiments = experimentsData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    (item.shortTitle && item.shortTitle.toLowerCase().includes(search.toLowerCase())) ||
    item.question.toLowerCase().includes(search.toLowerCase()) ||
    item.technology.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* Centered Global Search Input */}
      <GlassTextField
        value={search}
        onChange={setSearch}
        placeholder="Search experiments by tool, title, or keywords..."
        onClear={() => setSearch('')}
      />

      {filteredExperiments.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredExperiments.map((item) => (
            <div 
              key={item.id} 
              className="glass-card" 
              onClick={() => navigate(`/card/${item.id}`)}
              style={{
                padding: '36px 24px',
                minHeight: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left'
              }}
            >
              <div className="card-index">
                {String(item.number).padStart(2, '0')}
              </div>
              <h3 className="card-title">
                {item.shortTitle || item.title}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>
            No Laboratory Exercises Found
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            No exercises match the search query "{search}".
          </p>
        </div>
      )}
    </div>
  );
}
