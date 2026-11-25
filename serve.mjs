import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';

const host = '127.0.0.1';
const port = Number(process.argv[2] ?? 8765);
const page = new URL('./index.html', import.meta.url);

createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname;
  if (!['GET', 'HEAD'].includes(request.method) || !['/', '/index.html'].includes(path)) {
    response.writeHead(404).end();
    return;
  }
  try {
    const html = await readFile(page);
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store'});
    response.end(request.method === 'HEAD' ? undefined : html);
  } catch {
    response.writeHead(500).end('Could not read index.html');
  }
}).listen(port, host, () => {
  console.log(`http://${host}:${port}/`);
});
