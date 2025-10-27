async function loadStructure() {
  const res = await fetch('structure.json?v=' + Date.now());
  return await res.json();
}

function createFolderItem(name, value, parentPath) {
  const li = document.createElement('li');
  li.classList.add('folder');

  const textSpan = document.createElement('span');
  textSpan.textContent = name;
  const chevron = document.createElement('span');
  chevron.classList.add('chevron');
  chevron.textContent = '›';
  li.appendChild(textSpan);
  li.appendChild(chevron);

  const sublist = document.createElement('ul');
  sublist.classList.add('sublist');

  if (value._files) {
    value._files.forEach(file => {
      const fileLi = document.createElement('li');
      fileLi.classList.add('file');
      fileLi.textContent = file;
      fileLi.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('pdfViewer').src = encodeURI(`pdfjs/web/viewer.html?file=../${parentPath}/${name}/${file}`);
      });
      sublist.appendChild(fileLi);
    });
  }

  Object.keys(value).filter(k => k !== '_files').forEach(sub => {
    const child = createFolderItem(sub, value[sub], `${parentPath}/${name}`);
    sublist.appendChild(child);
  });

  li.addEventListener('click', (e) => {
    if (e.target === li || e.target === textSpan || e.target === chevron) {
      sublist.classList.toggle('open');
      li.classList.toggle('open');
    }
  });

  li.appendChild(sublist);
  return li;
}

function buildNavigation(structure) {
  const list = document.getElementById('folderList');
  list.innerHTML = '';
  Object.entries(structure).forEach(([name, value]) => {
    const item = createFolderItem(name, value, 'tutorials');
    list.appendChild(item);
  });
}

async function init() {
  const structure = await loadStructure();
  buildNavigation(structure);
}

init();
setInterval(init, 60000);
