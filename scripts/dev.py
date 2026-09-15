"""Prévia local com recarga automática: python3 scripts/dev.py."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import errno
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
EXTENSIONS = {'.html', '.css', '.js', '.svg', '.txt'}
IGNORED = {'.git', '.cache', '.codex', '.agents', 'node_modules', '_site', '__pycache__'}

def revision():
    files = sorted(p for p in ROOT.rglob('*') if not any(part in IGNORED for part in p.relative_to(ROOT).parts) and p.is_file() and p.suffix in EXTENSIONS)
    return hashlib.sha256('\n'.join(f'{p.relative_to(ROOT)}:{p.stat().st_mtime_ns}:{p.stat().st_size}' for p in files).encode()).hexdigest()

RELOAD = b'''<script>
(() => { let version; let busy = false;
setInterval(async () => {
  if (busy) return; busy = true;
  try { const r = await fetch('/__revision', {cache:'no-store'});
    if (!r.ok) return; const next = await r.json();
    if (version && version !== next) location.reload();
    version = next;
  } catch {} finally { busy = false; }
}, 700); })();
</script>'''

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_GET(self):
        if self.path.split('?')[0] == '/__revision':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(revision()).encode())
            return
        path = Path(self.translate_path(self.path))
        if path.is_dir():
            path = path / 'index.html'
        if path.is_file() and path.suffix == '.html':
            content = path.read_bytes().replace(b'</body>', RELOAD + b'</body>')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            return
        super().do_GET()

def open_server(port):
    for candidate in range(port, min(port + 20, 65536)):
        try:
            return ThreadingHTTPServer(('127.0.0.1', candidate), Handler)
        except OSError as error:
            if error.errno != errno.EADDRINUSE:
                raise
    raise OSError(errno.EADDRINUSE, 'Nenhuma porta disponível nas próximas 20 portas.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error('A porta deve estar entre 1 e 65535.')
    try:
        server = open_server(args.port)
    except OSError as error:
        parser.exit(1, f'Não foi possível iniciar a prévia: {error}\n')
    with server:
        port = server.server_port
        if port != args.port:
            print(f'Porta {args.port} ocupada. Usando a porta {port}.', flush=True)
        print(f'Prévia: http://localhost:{port}/projetos/kafka.html (Ctrl+C para encerrar)', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
