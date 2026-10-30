import { useState } from 'react';

export default function MarkdownRenderer({ content, onCopyCommand }) {
  if (!content) return null;

  // Split content by triple-backtick block boundaries
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
      {parts.map((part, index) => {
        // If this part is a code block
        if (part.startsWith('```')) {
          // Extract language and actual code content
          const match = part.match(/```(\w*)\n([\s\S]*?)```/);
          const lang = match ? match[1] : '';
          const code = match ? match[2].trim() : part.replace(/```/g, '').trim();

          return <CodeBlock key={index} code={code} lang={lang} onCopyCommand={onCopyCommand} />;
        }

        // Otherwise, render text inline with basic markdown tags (headers, lists, bold)
        return <TextBlock key={index} text={part} />;
      })}
    </div>
  );
}

function CodeBlock({ code, lang, onCopyCommand }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        if (onCopyCommand) onCopyCommand();
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Failed to copy command:', err));
  };

  return (
    <div className="glass-panel" style={{
      margin: '16px 0',
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--code-bg)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative'
    }}>
      {/* Code Block Header */}
      <div style={{
        padding: '6px 16px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
          {lang || 'code'}
        </span>
        <button
          onClick={copyToClipboard}
          className="glass-btn"
          style={{
            padding: '3px 8px',
            fontSize: '11px',
            borderRadius: '4px',
            background: copied ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            borderColor: copied ? '#34d399' : 'var(--glass-border)'
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code Area */}
      <pre style={{
        padding: '16px',
        margin: '0',
        overflowX: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '14px',
        color: 'var(--code-text)',
        lineHeight: '1.5'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TextBlock({ text }) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];

  const parseBoldText = (str) => {
    // Replace **text** with bold elements
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith('# ')) {
      flushList(elements, listItems, idx);
      elements.push(<h1 key={`h1-${idx}`} style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '20px', marginBottom: '10px' }}>{parseBoldText(trimmed.slice(2))}</h1>);
    } else if (trimmed.startsWith('## ')) {
      flushList(elements, listItems, idx);
      elements.push(<h2 key={`h2-${idx}`} style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '4px' }}>{parseBoldText(trimmed.slice(3))}</h2>);
    } else if (trimmed.startsWith('### ')) {
      flushList(elements, listItems, idx);
      elements.push(<h3 key={`h3-${idx}`} style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-primary)', marginTop: '12px', marginBottom: '6px' }}>{parseBoldText(trimmed.slice(4))}</h3>);
    } 
    // Unordered List Items
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      listItems.push(<li key={`li-${idx}-${listItems.length}`} style={{ marginBottom: '6px', marginLeft: '20px', color: 'var(--text-secondary)' }}>{parseBoldText(trimmed.slice(2))}</li>);
    } 
    // Plain paragraphs or empty spacing
    else {
      flushList(elements, listItems, idx);
      if (trimmed !== '') {
        elements.push(<p key={`p-${idx}`} style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>{parseBoldText(line)}</p>);
      }
    }
  });

  flushList(elements, listItems, lines.length);

  return <div style={{ display: 'flex', flexDirection: 'column' }}>{elements}</div>;
}

function flushList(elements, listItems, index) {
  if (listItems.length > 0) {
    elements.push(
      <ul key={`ul-${index}`} style={{ marginBottom: '12px', listStyleType: 'disc' }}>
        {[...listItems]}
      </ul>
    );
    listItems.length = 0; // Clear array in place
  }
}
