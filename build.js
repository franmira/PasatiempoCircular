// Builds index.html (the playable page served by GitHub Pages) from the template and the generator.
// Usage: node build.js
const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'src/index.template.html'), 'utf8');
const core = fs.readFileSync(path.join(__dirname, 'src/anillos-core.js'), 'utf8');

const split = template.indexOf('<div class="wrap">');
if (split < 0) throw new Error('No se encuentra <div class="wrap"> en la plantilla');
const head = template.slice(0, split).trim();
const body = template.slice(split).replace('/*CORE*/', () => core);

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Anillos: un pasatiempo de lógica nuevo cada día. Rellena los anillos con números del 1 al 8 sin repetir y sin que se toquen dos consecutivos.">
<meta property="og:title" content="Anillos · el pasatiempo diario">
<meta property="og:description" content="Un puzzle de lógica circular nuevo cada día.">
${head}
<style>body { margin: 0; } :root { padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }</style>
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log(`index.html generado (${html.length} bytes)`);
