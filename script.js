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
  if (profile.bio) {
    const paragraphs = profile.bio.split(/\n\s*\n/).filter(text => text.trim());
    byId('bio').replaceChildren(...paragraphs.map(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
  }
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
  function paginateProjects(list) {
    const cards = [...list.children];
    const pageCount = Math.ceil(cards.length / 6);
    if (pageCount <= 1) return;
    let page = 0;
    let timer;
    const controls = document.createElement('div');
    controls.className = 'project-pagination';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Páginas de projetos');
    const button = (text, action) => {
      const element = document.createElement('button');
      element.type = 'button';
      element.textContent = text;
      element.setAttribute('aria-controls', list.id);
      element.addEventListener('click', action);
      return element;
    };
    const status = document.createElement('span');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    const showPage = next => {
      page = (next + pageCount) % pageCount;
      cards.forEach((card, index) => { card.hidden = Math.floor(index / 6) !== page; });
      status.textContent = `${page + 1} / ${pageCount}`;
    };
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        if (!document.hidden && !list.contains(document.activeElement)) showPage(page + 1);
      }, 20000);
    };
    const move = direction => { showPage(page + direction); restart(); };
    const previous = button('← Anterior', () => move(-1));
    const next = button('Próxima →', () => move(1));
    controls.append(previous, status, next);
    list.after(controls);
    showPage(0);
    restart();
  }
  function renderProjects(projects) {
    byId('project-list').replaceChildren();
    projects.forEach((project, index) => {
      const card = document.createElement('article'); card.className = 'project-card professional-card';
      const top = document.createElement('div'); top.className = 'project-top';
      const category = document.createElement('span'); category.textContent = project.category || 'GITHUB / REPOSITÓRIO';
      top.append(category);
      const title = document.createElement('h4'); title.textContent = project.name;
      const description = document.createElement('p'); description.textContent = project.description || 'Veja os detalhes e o código deste projeto no GitHub.';
      title.setAttribute('translate', 'no');
      if (project.description) description.setAttribute('translate', 'no');
      const tags = document.createElement('div'); tags.className = 'tags'; addTags(tags, project.tags);
      card.append(top, title, description, tags);
      const url = safeUrl(project.url);
      if (url) { const link = document.createElement('a'); link.className = 'professional-project-link'; link.href = url; link.textContent = 'Explorar projeto ↗'; link.setAttribute('aria-label', `Explorar projeto: ${project.name}`); card.append(link); }
      byId('project-list').append(card);
    });
    paginateProjects(byId('project-list'));
  }
  function renderProjectGroup(projects, group, label) {
    byId(`${group}-section`).hidden = projects.length === 0;
    projects.forEach((project, index) => {
      const card = document.createElement('article');
      card.className = 'project-card professional-card';
      const top = document.createElement('div'); top.className = 'project-top';
      const category = document.createElement('span'); category.textContent = label;
      top.append(category);
      const title = document.createElement('h4'); title.textContent = project.name;
      const description = document.createElement('p'); description.className = 'project-text';
      description.textContent = project.description || '';
      const tags = document.createElement('div'); tags.className = 'tags'; addTags(tags, project.tags);
      card.append(top, title, description, tags);
      const link = document.createElement('a');
      link.href = /^(?:projetos\/(?:profissionais\/|pessoais\/)?)?[a-z0-9-]+\.html$/.test(project.page || '')
        ? project.page
        : `projeto.html?projeto=${encodeURIComponent(project.slug || String(index))}`;
      link.className = 'professional-project-link';
      link.textContent = 'Conhecer o projeto →';
      link.setAttribute('aria-label', `Conhecer o projeto: ${project.name}`);
      card.append(link);
      byId(`${group}-list`).append(card);
    });
    paginateProjects(byId(`${group}-list`));
  }
  function createCourseList(courses) {
    const list = document.createElement('ul'); list.className = 'education-courses';
    for (const course of Array.isArray(courses) ? courses : []) {
      const name = typeof course === 'string' ? course : course?.name;
      if (typeof name !== 'string' || !name.trim()) continue;
      const item = document.createElement('li'); item.textContent = name;
      if (typeof course === 'object') {
        const children = createCourseList(course.courses);
        if (children.children.length) item.append(children);
      }
      list.append(item);
    }
    return list;
  }
  function renderEducation() {
    const entries = (profile.education || []).filter(entry => entry.name?.trim());
    byId('education-status').hidden = entries.length > 0;
    for (const entry of entries) {
      const card = document.createElement('article'); card.className = 'education-card';
      if (entry.category?.trim()) {
        const category = document.createElement('p'); category.className = 'eyebrow';
        category.textContent = entry.category; card.append(category);
      }
      const title = document.createElement('h3'); title.textContent = entry.name; card.append(title);
      const details = [entry.institution, entry.period, entry.status].filter(value => value?.trim());
      if (details.length) {
        const meta = document.createElement('p'); meta.className = 'education-meta';
        meta.textContent = details.join(' · '); card.append(meta);
      }
      if (entry.description?.trim()) {
        const description = document.createElement('p');
        description.textContent = entry.description; card.append(description);
      }
      const list = createCourseList(entry.courses);
      if (list.children.length) {
        const heading = document.createElement('h4'); heading.className = 'education-courses-title';
        heading.textContent = 'Cursos da formação'; card.append(heading);
        card.append(list);
      }
      const certificateUrl = safeUrl(entry.certificateUrl);
      if (certificateUrl) {
        const link = document.createElement('a'); link.href = certificateUrl;
        link.textContent = 'Ver certificado ↗';
        link.setAttribute('aria-label', `Ver certificado: ${entry.name}`); card.append(link);
      }
      byId('education-list').append(card);
    }
  }
  renderEducation();
  renderProjectGroup(profile.professionalProjects || [], 'professional', 'EXPERIÊNCIA PROFISSIONAL');
  renderProjectGroup(profile.personalProjects || [], 'personal', 'PROJETO PESSOAL');
  async function loadProjects() {
    if (profile.projects?.length) { renderProjects(profile.projects); return; }
    if (!username) { setText('project-status', 'Novos projetos serão adicionados em breve.'); return; }
    setText('project-status', 'Carregando projetos do GitHub…');
    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('GitHub indisponível');
      const repos = await response.json();
      const hiddenRepos = new Set(['faelk8', 'rafael_io']);
      const projects = repos
        .filter(repo => !hiddenRepos.has(repo.name.toLowerCase()))
        .filter(repo => repo.private === false && (!repo.visibility || repo.visibility === 'public') && !repo.fork && !repo.archived)
        .map(repo => ({ name: repo.name, description: repo.description, tags: repo.language ? [repo.language] : [], url: repo.html_url }));
      renderProjects(projects);
      byId('project-status').textContent = projects.length ? 'Repositórios públicos atualizados recentemente.' : 'Novos projetos serão adicionados em breve.';
    } catch { setText('project-status', 'Não foi possível carregar os projetos agora. Você pode acessá-los pelo link do GitHub acima.'); }
  }
  loadProjects();
})();
