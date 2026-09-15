"""Gera os arquivos públicos: python3 scripts/build.py."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '_site'

def build():
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    for filename in ('index.html', 'projeto.html', 'styles.css', 'script.js', 'projeto.js', 'profile.js'):
        shutil.copy2(ROOT / filename, OUTPUT / filename)
    for folder in ('assets', 'projetos'):
        shutil.copytree(ROOT / folder, OUTPUT / folder)
    print('Build pronto em _site/')

if __name__ == '__main__':
    build()
