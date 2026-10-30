import { useState } from 'react';
import Toast from './Toast';

export default function KnowledgeVault() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFileName, setCurrentFileName] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Filter for markdown files
    const mdFiles = files.filter(f => f.name.endsWith('.md') || f.name.endsWith('.txt'));
    if (mdFiles.length === 0) {
      showToast('Please select valid .md or .txt files');
      return;
    }

    setImporting(true);
    setProgress(0);
    
    // Process files sequentially to simulate premium network/parsing progress
    let processedCount = 0;
    const allParsedFiles = [];

    const processNextFile = (index) => {
      if (index >= mdFiles.length) {
        // Complete state
        setTimeout(() => {
          setUploadedFiles(prev => [...prev, ...allParsedFiles]);
          setImporting(false);
          setProgress(100);
          showToast(`Successfully imported ${mdFiles.length} laboratory files`);
          
          // Trigger a lightweight click/haptic audio sound if supported
          try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.connect(gain);
            gain.connect(context.destination);
            osc.frequency.setValueAtTime(800, context.currentTime);
            gain.gain.setValueAtTime(0.1, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.15);
            osc.start();
            osc.stop(context.currentTime + 0.15);
          } catch {
            // Audio context not allowed or blocked
          }
        }, 500);
        return;
      }

      const file = mdFiles[index];
      setCurrentFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        // Parse a brief summary (first 100 characters)
        const summary = content.slice(0, 120) + (content.length > 120 ? '...' : '');
        
        allParsedFiles.push({
          name: file.name,
          size: file.size,
          content: content,
          summary: summary,
          timestamp: new Date().toLocaleTimeString()
        });

        processedCount++;
        const percent = Math.round((processedCount / mdFiles.length) * 100);
        setProgress(percent);
        
        // Process next file with a short simulated delay
        setTimeout(() => {
          processNextFile(index + 1);
        }, 300);
      };
      reader.readAsText(file);
    };

    processNextFile(0);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
      
      {/* Vault Banner */}
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          📦 Knowledge Vault Import Center
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Import custom Markdown laboratory notes and manuals directly. Files are parsed locally inside your browser and can be loaded into the Curator Pad workspace.
        </p>
      </div>

      <div className="bento-grid">
        {/* Upload Action Card */}
        <div className="glass-panel" style={{ gridColumn: 'span 5', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Upload Markdown Docs</h3>
          
          {/* File Drag Box */}
          <div style={{
            border: '2px dashed var(--glass-border)',
            borderRadius: '12px',
            padding: '40px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            position: 'relative'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
          >
            <input
              type="file"
              multiple
              accept=".md,.txt"
              onChange={handleFileUpload}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>📂</span>
            <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500', display: 'block' }}>
              Drag & Drop files here or click to browse
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginTop: '6px' }}>
              Supports .md or .txt files
            </span>
          </div>

          {/* Import Progress Bar */}
          {importing && (
            <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                <span>Importing: {currentFileName}</span>
                <span>{progress}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', transition: 'width 0.1s ease' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Database Metrics and Uploaded list */}
        <div className="glass-panel" style={{ gridColumn: 'span 7', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>Imported Documents Database</h3>
            <span className="glass-btn" style={{ padding: '4px 10px', fontSize: '12px', cursor: 'default' }}>
              Total: {uploadedFiles.length} docs
            </span>
          </div>

          {uploadedFiles.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '350px', overflowY: 'auto', paddingRight: '8px' }}>
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.01)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)', fontSize: '14px' }}>📄 {file.name}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{(file.size / 1024).toFixed(2)} KB · {file.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '0' }}>
                    {file.summary}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
              <span style={{ fontSize: '28px', opacity: 0.5 }}>📥</span>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px' }}>No documents imported yet</p>
            </div>
          )}
        </div>
      </div>

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
