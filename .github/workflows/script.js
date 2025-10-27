async function loadStructure() {
  const res = await fetch("structure.json");
  return res.json();
}

async function init() {
  const structure = await loadStructure();
  const folderList = document.getElementById("folderList");
  const viewer = document.getElementById("pdfViewer");

  for (const [folder, subfolders] of Object.entries(structure)) {
    const folderItem = document.createElement("li");
    folderItem.textContent = folder;
    const subList = document.createElement("ul");

    for (const [sub, files] of Object.entries(subfolders)) {
      const subItem = document.createElement("li");
      subItem.textContent = `📁 ${sub}`;
      const fileList = document.createElement("ul");

      files.forEach(file => {
        const fileItem = document.createElement("li");
        fileItem.textContent = file;
        fileItem.addEventListener("click", () => {
          // Загружаем через PDF.js Viewer
          viewer.src = `pdfjs/web/viewer.html?file=../tutorials/${folder}/${sub}/${file}`;
        });
        fileList.appendChild(fileItem);
      });

      subItem.appendChild(fileList);
      subList.appendChild(subItem);
    }

    folderItem.appendChild(subList);
    folderList.appendChild(folderItem);
  }
}

init();
