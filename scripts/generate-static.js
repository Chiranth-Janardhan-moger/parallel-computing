import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const experimentsData = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'src', 'data', 'experiments.json'), 'utf8')
);

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

console.log('Successfully generated public/all.c, public/all.txt, and 1.c - 9.c');
