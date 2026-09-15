(() => {
  'use strict';
  const id = document.body.dataset.project || new URLSearchParams(window.location.search).get('projeto');
  const projects = window.PROFILE?.professionalProjects || [];
  const project = projects.find((item, index) => (item.slug || String(index)) === id);
  const byId = (value) => document.getElementById(value);
  if (!project) {
    byId('project-not-found').hidden = false;
    document.title = 'Projeto não encontrado · Rafael Batista';
    return;
  }
  if (['kafka', 'arquitetura-medalhao', 'sistema-de-recomendacao'].includes(project.slug)) {
    window.location.replace(new URL(project.page, window.location.href).href);
    return;
  }
  document.title = `${project.name} · Rafael Batista`;
  document.querySelector('meta[name="description"]').content = project.description || project.name;
  byId('project-article').hidden = false;
  byId('project-title').textContent = project.name;
  byId('project-description').textContent = project.description || '';
  for (const tag of project.tags || []) {
    const span = document.createElement('span');
    span.className = 'tag'; span.textContent = tag;
    byId('project-tags').append(span);
  }
  // Páginas com relato próprio mantêm o conteúdo escrito no HTML.
  if (document.body.dataset.story === 'html') return;
  const defaultSections = [
    ['context', 'Contexto e desafio'],
    ['contribution', 'O que eu fiz'],
    ['architecture', 'Como foi feito'],
    ['results', 'Resultados e aprendizados'],
  ];
  const sections = project.sections || defaultSections.map(([key, title]) => ({ title, text: project[key] }));
  for (const item of sections) {
    if (typeof item.text !== 'string' || !item.text.trim()) continue;
    const section = document.createElement('section'); section.className = 'project-story-section';
    const heading = document.createElement('h2'); heading.textContent = item.title;
    const text = document.createElement('p'); text.textContent = item.text;
    section.append(heading, text);
    byId('project-story').append(section);
  }
  byId('project-empty').hidden = byId('project-story').children.length > 0;
})();
