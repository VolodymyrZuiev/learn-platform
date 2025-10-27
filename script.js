/* ===========================================
   Learn Platform — Auto PDF Navigation
   -------------------------------------------
   💁‍♀️ Автоматически строит меню из structure.json
   📎 Показывает PDF через встроенный viewer браузера
   =========================================== */

// Загружаем JSON-структуру
async function loadStructure() {
  const res = await fetch('structure.json?v=' + Date.now(), { cache: 'no-store' });
  return await res.json();
}

// Построение навигации
function buildNavigation(structure) {
  const folderList = document.getElementById('folderList');
  folderList.innerHTML = '';

  for (const [folder, content] of Object.entries(structure)) {
    const folderItem = document.createElement('li');
    folderItem.textContent = folder;

    const subList = document.createElement('ul');

    // файлы в корне папки
    if (content._files) {
      content._files.forEach(file => {
        const fileItem = document.createElement('li');
        fileItem.textContent = file;
        fileItem.addEventListener('click', () => {
          document.getElementById('pdfViewer').src = encodeURI(`tutorials/${folder}/${file}`);
        });
        subList.appendChild(fileItem);
      });
    }

    // подпапки
    Object.keys(content).filter(k => k !== '_files').forEach(sub => {
      const subItem = document.createElement('li');
      subItem.textContent = sub;
      const nestedList = document.createElement('ul');

      const subContent = content[sub];
      if (subContent._files) {
        subContent._files.forEach(file => {
          const fi = document.createElement('li');
          fi.textContent = file;
          fi.addEventListener('click', () => {
            document.getElementById('pdfViewer').src = encodeURI(`tutorials/${folder}/${sub}/${file}`);
          });
          nestedList.appendChild(fi);
        });
      }

      subItem.appendChild(nestedList);
      subList.appendChild(subItem);
    });

    folderItem.appendChild(subList);
    folderList.appendChild(folderItem);
  }
}

// Инициализация
async function init() {
  try {
    const structure = await loadStructure();
    buildNavigation(structure);
  } catch (e) {
    console.error('Не удалось загрузить structure.json', e);
  }
}

init();
