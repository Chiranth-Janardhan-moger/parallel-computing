import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const experimentsData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src', 'data', 'experiments.json'), 'utf8')
);

// 1. Generate combined all.c and all.txt
const allContent = experimentsData
  .map((exp) => {
    return `/* ====================================================================
   PROGRAM ${String(exp.number).padStart(2, '0')}: ${exp.title}
   Technology:  ${exp.technology}
   File:        ${exp.file}
   Compilation: ${exp.compileCommand}
   Execution:   ${exp.runCommand}
   ==================================================================== */

${exp.code}`;
  })
  .join('\n\n\n');

const banner = `/* ====================================================================
   PARALLEL COMPUTING LABORATORY (BCSL706)
   Complete OpenMP & MPI Programs Reference
   ==================================================================== */\n\n`;

const publicDir = path.join(rootDir, 'public');
fs.writeFileSync(path.join(publicDir, 'all.c'), banner + allContent + '\n', 'utf8');
fs.writeFileSync(path.join(publicDir, 'all.txt'), banner + allContent + '\n', 'utf8');

// 2. Generate individual 1.c to 9.c
experimentsData.forEach((exp) => {
  const fileHeader = `/* ====================================================================
   PROGRAM ${String(exp.number).padStart(2, '0')}: ${exp.title}
   Technology:  ${exp.technology}
   File:        ${exp.file}
   Compilation: ${exp.compileCommand}
   Execution:   ${exp.runCommand}
   ==================================================================== */\n\n`;
  fs.writeFileSync(
    path.join(publicDir, `${exp.number}.c`),
    fileHeader + exp.code + '\n',
    'utf8'
  );
});

// 3. Generate pre-rendered index.html with inlined critical CSS for 100/100 Lighthouse performance
const cssContent = fs.readFileSync(path.join(rootDir, 'src', 'index.css'), 'utf8');

const cardsHtml = experimentsData
  .map((item) => {
    const num = String(item.number).padStart(2, '0');
    const title = item.shortTitle || item.title;
    return `          <a href="/card/${item.id}" class="glass-card" style="padding: 36px 24px; min-height: 180px; display: flex; flex-direction: column; justify-content: space-between; text-align: left; text-decoration: none;">
            <div class="card-index">${num}</div>
            <h3 class="card-title">${title}</h3>
          </a>`;
  })
  .join('\n');

const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Parallel Computing Laboratory | BCSL706</title>
    <meta name="description" content="Parallel Computing Laboratory (BCSL706) - Complete OpenMP and MPI lab programs, compilation commands, and sample outputs." />

    <!-- Preconnect to Font Origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Non-render-blocking Asynchronous Google Fonts Loading -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap" media="print" onload="this.media='all'" />
    <noscript>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap" />
    </noscript>

    <!-- Inlined Critical CSS for 0ms Render-blocking Time -->
    <style>
${cssContent}
    </style>
  </head>
  <body>
    <div id="root">
      <div class="app-container" style="padding: 20px 0;">
        <div class="orb-container">
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          <div class="orb orb-3"></div>
        </div>
        <main class="container-box fade-in" style="flex-grow: 1;">
          <header class="portal-header">
            <a href="/" class="portal-brand" title="Parallel Computing Laboratory Exercises Home">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-primary);">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
              </svg>
              <span>Parallel Computing Laboratory Exercises</span>
            </a>
            <div class="portal-header-actions">
              <button class="glass-btn" title="Copy all 9 lab programs completely to clipboard">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy All Programs
              </button>
              <div class="history-menu-container">
                <button type="button" class="glass-btn history-trigger-btn" title="Course Labs History (INS, ML &amp; Docker)" aria-label="Course Labs History">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M12 7v5l4 2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </header>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-top: 10px;">
${cardsHtml}
          </div>
        </main>
      </div>
    </div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(rootDir, 'index.html'), htmlContent, 'utf8');

console.log('Successfully generated public/all.c, individual .c files, and pre-rendered index.html');
