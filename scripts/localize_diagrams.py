"""Gera as versões dos diagramas em inglês e espanhol a partir do catálogo do site."""
from pathlib import Path
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]


def localize_diagrams(destination=None):
    destination = Path(destination) if destination else ROOT / 'assets'
    source = (ROOT / 'locales/messages.js').read_text()
    messages = json.loads(source.split('window.SITE_TRANSLATIONS = ', 1)[1].strip().removesuffix(';'))
    ET.register_namespace('', 'http://www.w3.org/2000/svg')
    for name in ('arquitetura-kafka', 'arquitetura-anti-fraude'):
        for index, locale in enumerate(('en-US', 'es-ES')):
            tree = ET.parse(ROOT / 'assets' / f'{name}.svg')
            tree.getroot().set('lang', locale)
            for element in tree.iter():
                if element.tag.rsplit('}', 1)[-1] not in ('text', 'title', 'desc', 'tspan'):
                    continue
                if element.text:
                    key = ' '.join(element.text.split())
                    if key in messages:
                        element.text = messages[key][index]
            tree.write(destination / f'{name}.{locale}.svg', encoding='utf-8', xml_declaration=True)


if __name__ == '__main__':
    localize_diagrams()
