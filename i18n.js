(() => {
  'use strict';
  const languages = ['pt-BR', 'en-US', 'es-ES'];
  const storageKey = 'rafael-site-language';
  const messages = window.SITE_TRANSLATIONS || {};
  const originals = new WeakMap();
  const attributeOriginals = new WeakMap();
  const attributes = ['aria-label', 'alt', 'title'];
  const ignored = 'script, style, code, pre, textarea, [translate="no"]';
  let language = 'pt-BR';
  try {
    const saved = localStorage.getItem(storageKey);
    if (languages.includes(saved)) language = saved;
  } catch { /* Language switching also works without browser storage. */ }

  const normalize = value => value.replace(/\s+/g, ' ').trim();
  function translate(value) {
    if (language === 'pt-BR') return value;
    const key = normalize(value);
    const entry = messages[key];
    if (entry) {
      const result = entry[language === 'en-US' ? 0 : 1];
      // Keep whitespace around inline links, icons, and nested course lists.
      return value.replace(/\S(?:[\s\S]*\S)?/, result);
    }
    if (key.endsWith(' · Rafael Batista')) {
      return translate(key.slice(0, -' · Rafael Batista'.length)) + ' · Rafael Batista';
    }
    // Accessible labels generated with a project or course name.
    for (const prefix of ['Conhecer o projeto:', 'Explorar projeto:', 'Ver certificado:']) {
      if (key.startsWith(prefix + ' ')) {
        return translate(prefix) + ' ' + translate(key.slice(prefix.length).trim());
      }
    }
    return value;
  }

  function translateText(node) {
    if (!node.parentElement || node.parentElement.closest(ignored)) return;
    let record = originals.get(node);
    if (!record || node.nodeValue !== record.rendered) {
      record = { original: node.nodeValue };
      originals.set(node, record);
    }
    record.rendered = translate(record.original);
    if (node.nodeValue !== record.rendered) node.nodeValue = record.rendered;
  }

  function translateAttribute(element, name) {
    const value = element.getAttribute(name);
    if (value === null) return;
    let records = attributeOriginals.get(element);
    if (!records) { records = new Map(); attributeOriginals.set(element, records); }
    let record = records.get(name);
    if (!record || value !== record.rendered) {
      record = { original: value };
      records.set(name, record);
    }
    record.rendered = translate(record.original);
    if (value !== record.rendered) element.setAttribute(name, record.rendered);
  }

  const observer = new MutationObserver(() => render());
  function render() {
    observer.disconnect();
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateText(walker.currentNode);
    document.querySelectorAll('[aria-label], [alt], [title], meta[name="description"]').forEach(element => {
      if (element.closest(ignored)) return;
      attributes.forEach(name => translateAttribute(element, name));
      if (element.matches('meta[name="description"]')) translateAttribute(element, 'content');
    });
    document.querySelectorAll('[data-i18n-diagram]').forEach(element => {
      const original = element.dataset.i18nDiagram;
      const localized = language === 'pt-BR' ? original : original.replace('.svg', `.${language}.svg`);
      element.setAttribute(element.tagName === 'IMG' ? 'src' : 'href', localized);
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    observer.observe(document.documentElement, {
      subtree: true, childList: true, characterData: true,
      attributes: true, attributeFilter: [...attributes, 'content'],
    });
  }

  document.querySelectorAll('.language-switcher').forEach(selector => {
    selector.hidden = false;
    selector.addEventListener('click', event => {
      const button = event.target.closest('button[data-language]');
      if (!button || !languages.includes(button.dataset.language)) return;
      language = button.dataset.language;
      try { localStorage.setItem(storageKey, language); } catch { /* Optional persistence. */ }
      render();
    });
  });
  render();
})();
