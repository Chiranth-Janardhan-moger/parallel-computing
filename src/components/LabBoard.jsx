import { useNavigate } from 'react-router-dom';
import experimentsData from '../data/experiments.json';

export default function LabBoard() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '10px'
    }}>
      {experimentsData.map((item) => (
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
  );
}
