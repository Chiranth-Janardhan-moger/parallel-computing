import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const experimentsData = require('../src/data/experiments.json');

export default function handler(req, res) {
  const { id } = req.query || {};

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');

  // If no specific ID, return all programs combined
  if (!id || id === 'all') {
    const combined = experimentsData
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

    const host = (req.headers && req.headers.host) ? req.headers.host : 'pc-lab.vercel.app';
    const header = `/* ====================================================================
   PARALLEL COMPUTING LABORATORY (BCSL706)
   Complete OpenMP & MPI Programs Reference
   
   Curl Cheatsheet:
     All programs:   curl -s "https://${host}/"
     Single program: curl -s "https://${host}/card/<1-9>"  (e.g. /card/2)
     Save to file:   curl -s "https://${host}/card/2" > prog2.c
   ==================================================================== */\n\n`;

    return res.status(200).send(header + combined + '\n');
  }

  // Lookup program by ID (1-9), number, or filename
  const rawId = String(id).trim();
  const cleanNum = rawId.replace(/^0+/, '') || '0';
  const experiment = experimentsData.find(
    (item) =>
      String(item.id) === rawId ||
      String(item.id) === cleanNum ||
      Number(item.number) === Number(rawId) ||
      item.file.toLowerCase().includes(rawId.toLowerCase())
  );

  if (!experiment) {
    const host = (req.headers && req.headers.host) ? req.headers.host : 'pc-lab.vercel.app';
    return res.status(404).send(
      `Error: Program "${id}" not found.\nValid program numbers are 1 to 9.\nExample: curl -s "https://${host}/card/2"\n`
    );
  }

  const fileHeader = `/* ====================================================================
   PROGRAM ${String(experiment.number).padStart(2, '0')}: ${experiment.title}
   Technology:  ${experiment.technology}
   File:        ${experiment.file}
   Compilation: ${experiment.compileCommand}
   Execution:   ${experiment.runCommand}
   ==================================================================== */\n\n`;

  return res.status(200).send(fileHeader + experiment.code + '\n');
}
