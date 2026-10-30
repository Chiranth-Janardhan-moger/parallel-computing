import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import Toast from './Toast';

export default function CuratorPad() {
  const [inputText, setInputText] = useState(`# Machine Learning Lab Notes Workspace

Paste your markdown code blocks or algorithms here to read them under a custom view.

- **Generalization**: Evaluate S and G boundaries for version space.
- **Ensemble Power**: Random Forests reduce variance via aggregation.

\`\`\`python
# Example: Evaluate predictions accuracy
import numpy as np
predictions = np.array([1, 0, 1, 1])
y_test = np.array([1, 0, 0, 1])
accuracy = np.mean(predictions == y_test)
print(f"Accuracy: {accuracy * 100}%")
\`\`\``);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const handleCopyCommand = () => {
    showToast('Code Copied Successfully');
  };

  // Grab text from user clipboard using Navigator API
  const grabFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        showToast('Clipboard Text Loaded Successfully');
      } else {
        showToast('Clipboard is empty');
      }
    } catch {
      showToast('Clipboard permission denied by browser');
    }
  };

  // Copy full editor content back to clipboard
  const copyWorkspaceContent = () => {
    navigator.clipboard.writeText(inputText)
      .then(() => showToast('Workspace Content Copied Successfully'))
      .catch(err => console.error('Failed to copy workspace content:', err));
  };

  // Stats calculators
  const charCount = inputText.length;
  const wordCount = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200); // 200 words per minute average reading speed
  const codeBlocksCount = (inputText.match(/```/g) || []).length / 2;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          ✍️ Curator Pad Workspace
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          A dedicated edge-to-edge interactive laboratory workspace. Grab clipboard templates, inspect code structures, and read notes with custom typography properties.
        </p>
      </div>

      <div className="bento-grid">
        {/* Left Side: Editor & Configuration */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Markdown Input Editor
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={grabFromClipboard} className="glass-btn" style={{ padding: '6px 12px', fontSize: '13px' }}>
                📋 Grab Clipboard
              </button>
              <button onClick={copyWorkspaceContent} className="glass-btn" style={{ padding: '6px 12px', fontSize: '13px' }}>
                💾 Copy All
              </button>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your Markdown here..."
            className="glass-input"
            style={{
              flexGrow: 1,
              minHeight: '260px',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              resize: 'vertical',
              lineHeight: '1.4'
            }}
          />

          {/* Typography adjusters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Typography controls</h4>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Text Size:</span>
                  <span>{fontSize}px</span>
                </label>
                <input
                  type="range"
                  min="13"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>

              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Line Spacing:</span>
                  <span>{lineHeight}</span>
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="2.2"
                  step="0.1"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: High Fidelity Document Reader & Stats */}
        <div className="glass-panel" style={{ gridColumn: 'span 6', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Curated Reader
            </h3>
            
            {/* Stats Indicators */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span className="glass-btn" style={{ padding: '3px 8px', fontSize: '11px', cursor: 'default' }}>
                Words: {wordCount}
              </span>
              <span className="glass-btn" style={{ padding: '3px 8px', fontSize: '11px', cursor: 'default' }}>
                Chars: {charCount}
              </span>
              <span className="glass-btn" style={{ padding: '3px 8px', fontSize: '11px', cursor: 'default' }}>
                Time: {readTime}m
              </span>
              <span className="glass-btn" style={{ padding: '3px 8px', fontSize: '11px', cursor: 'default' }}>
                Code: {Math.floor(codeBlocksCount)} blocks
              </span>
            </div>
          </div>

          {/* Reader viewport panel */}
          <div className="glass-panel" style={{
            flexGrow: 1,
            minHeight: '340px',
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.01)',
            overflowY: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.04)'
          }}>
            <div style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}>
              {inputText ? (
                <MarkdownRenderer content={inputText} onCopyCommand={handleCopyCommand} />
              ) : (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center', marginTop: '60px' }}>
                  Your processed document will appear here in real-time...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Toast message={toastMessage} visible={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  );
}
