(() => {
  'use strict';
  const profile = window.PROFILE || {};
  const byId = (id) => document.getElementById(id);
  const safeUrl = (value) => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
    catch { return null; }
  };
  const setText = (id, value) => { if (value) byId(id).textContent = value; };
  setText('hero-name', profile.name);
  setText('intro', profile.intro);
  setText('about-lead', profile.aboutLead);
  setText('bio', profile.bio);
  byId('year').textContent = new Date().getFullYear();
  function addTags(parent, tags) {
    for (const tag of tags || []) {
      const span = document.createElement('span');
      span.className = 'tag'; span.textContent = tag; parent.append(span);
    }
  }
  addTags(byId('interests'), profile.interests);
  const username = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(profile.github || '') ? profile.github : '';
  const githubUrl = username ? `https://github.com/${encodeURIComponent(username)}` : '';
  function contactLink(label, url) {
    const link = document.createElement('a');
    link.textContent = `${label} ↗`; link.href = url;
    byId('contact-links').append(link);
  }
  if (githubUrl) {
    const link = byId('github-link'); link.href = githubUrl; link.hidden = false;
    contactLink('GitHub', githubUrl);
  }
  if (profile.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) contactLink('E-mail', `mailto:${profile.email}`);
  if (safeUrl(profile.linkedin)) contactLink('LinkedIn', safeUrl(profile.linkedin));
  if (byId('contact-links').children.length) setText('contact-description', 'Quer conversar sobre um projeto ou trocar uma ideia? Entre em contato.');
  function renderProjects(projects) {
    byId('project-list').replaceChildren();
    projects.forEach((project, index) => {
      const card = document.createElement('article'); card.className = 'project-card';
      const top = document.createElement('div'); top.className = 'project-top';
      const category = document.createElement('span'); category.textContent = project.category || 'GITHUB / REPOSITÓRIO';
      const number = document.createElement('span'); number.className = 'project-number'; number.textContent = String(index + 1).padStart(2, '0');
      top.append(category, number);
      const title = document.createElement('h3'); title.textContent = project.name;
      const description = document.createElement('p'); description.textContent = project.description || 'Veja os detalhes e o código deste projeto no GitHub.';
      const tags = document.createElement('div'); tags.className = 'tags'; addTags(tags, project.tags);
      card.append(top, title, description, tags);
      const url = safeUrl(project.url);
      if (url) { const link = document.createElement('a'); link.href = url; link.textContent = 'Explorar projeto ↗'; link.setAttribute('aria-label', `Explorar projeto: ${project.name}`); card.append(link); }
      byId('project-list').append(card);
    });
  }
  async function loadProjects() {
    if (profile.projects?.length) { renderProjects(profile.projects); return; }
    if (!username) { setText('project-status', 'Novos projetos serão adicionados em breve.'); return; }
    setText('project-status', 'Carregando projetos do GitHub…');
    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('GitHub indisponível');
      const repos = await response.json();
      const projects = repos.filter(repo => !repo.fork && !repo.archived).slice(0, 6).map(repo => ({ name: repo.name, description: repo.description, tags: repo.language ? [repo.language] : [], url: repo.html_url }));
      renderProjects(projects);
      byId('project-status').textContent = projects.length ? 'Repositórios públicos atualizados recentemente.' : 'Novos projetos serão adicionados em breve.';
    } catch { setText('project-status', 'Não foi possível carregar os projetos agora. Você pode acessá-los pelo link do GitHub acima.'); }
  }
  loadProjects();
})();
