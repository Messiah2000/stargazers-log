async function loadStarredRepos() {
  const container = document.getElementById('starred-list-container');
  if (!container) {
    return;
  }

  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error(`Failed to load events.json: ${response.status}`);
    }

    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      container.innerHTML = '<p class="empty-state">No starred repositories found.</p>';
      return;
    }

    const list = document.createElement('ul');
    list.className = 'starred-list';

    repos.forEach(repo => {
      const item = document.createElement('li');
      item.className = 'starred-item';

      const title = document.createElement('a');
      title.href = repo.url || '#';
      title.target = '_blank';
      title.rel = 'noopener noreferrer';
      title.textContent = repo.name || 'Unnamed repository';

      const description = document.createElement('p');
      description.textContent = repo.description || 'No description available.';

      const meta = document.createElement('div');
      meta.className = 'meta';

      if (repo.language) {
        const language = document.createElement('span');
        language.textContent = `Language: ${repo.language}`;
        meta.appendChild(language);
      }
      if (repo.stars !== undefined) {
        const stars = document.createElement('span');
        stars.textContent = `Stars: ${repo.stars}`;
        meta.appendChild(stars);
      }
      if (repo.starredAt) {
        const starredAt = document.createElement('span');
        starredAt.textContent = `Starred: ${repo.starredAt}`;
        meta.appendChild(starredAt);
      }

      item.append(title, description, meta);
      list.appendChild(item);
    });

    container.appendChild(list);
  } catch (error) {
    console.error('Unable to load starred repositories:', error);
    container.innerHTML = '<p class="empty-state">Unable to load starred repositories.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadStarredRepos);
