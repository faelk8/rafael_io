"""Gera os arquivos públicos: python3 scripts/build.py."""
from pathlib import Path
import shutil
import hashlib
import re
from localize_diagrams import localize_diagrams

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '_site'

def version_assets(output):
    """Atualiza URLs quando o conteúdo muda, evitando JavaScript/CSS antigo em cache."""
    for page in output.rglob('*.html'):
        def version(match):
            attribute, url = match.groups()
            if url.startswith(('https://', 'http://', '//')):
                return match.group(0)
            asset = (page.parent / url).resolve()
            asset.relative_to(output.resolve())
            digest = hashlib.sha256(asset.read_bytes()).hexdigest()[:16]
            return f'{attribute}="{url}?v={digest}"'

        content = re.sub(r'(src|href)="([^"?]+\.(?:js|css))"', version, page.read_text())
        page.write_text(content)


def build():
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    for filename in ('index.html', 'projeto.html', 'styles.css', 'script.js', 'projeto.js', 'profile.js', 'i18n.js'):
        shutil.copy2(ROOT / filename, OUTPUT / filename)
    for folder in ('assets', 'projetos', 'locales'):
        shutil.copytree(ROOT / folder, OUTPUT / folder)
    localize_diagrams(OUTPUT / 'assets')
    version_assets(OUTPUT)
    print('Build pronto em _site/')

if __name__ == '__main__':
    build()
