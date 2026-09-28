"""Gera os arquivos públicos: python3 scripts/build.py."""
from pathlib import Path
import shutil
from localize_diagrams import localize_diagrams

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '_site'

def build():
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    for filename in ('index.html', 'projeto.html', 'styles.css', 'script.js', 'projeto.js', 'profile.js', 'i18n.js'):
        shutil.copy2(ROOT / filename, OUTPUT / filename)
    for folder in ('assets', 'projetos', 'locales'):
        shutil.copytree(ROOT / folder, OUTPUT / folder)
    localize_diagrams(OUTPUT / 'assets')
    print('Build pronto em _site/')

if __name__ == '__main__':
    build()
