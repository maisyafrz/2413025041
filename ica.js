const tugasContainer = document.getElementById("tugasContainer");

for (let i = 1; i <= 4; i++) {
  const tugasBox = document.createElement("div");
  tugasBox.classList.add("task");

  tugasBox.innerHTML = `
    <h3>Tugas ${i}</h3>
    <label>Nama Tugas:</label>
    <input type="text" id="namaTugas${i}" placeholder="Contoh: Tugas Makalah"><br>

    <label>Mata Kuliah:</label>
    <input type="text" id="matkul${i}" placeholder="Contoh: Sistem Basis Data"><br>

    <label>Program Studi:</label>
    <input type="text" id="prodi${i}" placeholder="Contoh: Teknik Informatika"><br>

    <label>Link Google Drive (PDF):</label>
    <input type="url" id="linkPdf${i}" placeholder="https://drive.google.com/..."><br>

    <label>Link YouTube:</label>
    <input type="url" id="linkYt${i}" placeholder="https://youtube.com/..."><br>

    <button onclick="tampilkanTugas(${i})">Tampilkan</button>
    <div id="output${i}" class="output"></div>
    <hr />
  `;

  tugasContainer.appendChild(tugasBox);
}

function tampilkanTugas(i) {
  const nama = document.getElementById(`namaTugas${i}`).value;
  const matkul = document.getElementById(`matkul${i}`).value;
  const prodi = document.getElementById(`prodi${i}`).value;
  const linkPdf = document.getElementById(`linkPdf${i}`).value;
  const linkYt = document.getElementById(`linkYt${i}`).value;

  const output = document.getElementById(`output${i}`);
  let pdfEmbed = "";
  let ytEmbed = "";

  if (linkPdf.includes("drive.google.com")) {
    const fileId = extractDriveId(linkPdf);
    pdfEmbed = `<iframe src="https://drive.google.com/file/d/${fileId}/preview" width="100%" height="400"></iframe>`;
  }

  if (linkYt.includes("youtube.com") || linkYt.includes("youtu.be")) {
    const embedYt = convertYouTubeLink(linkYt);
    ytEmbed = `<iframe width="100%" height="315" src="${embedYt}" allowfullscreen></iframe>`;
  }

  output.innerHTML = `
    <h4>${nama}</h4>
    <p><strong>Mata Kuliah:</strong> ${matkul}</p>
    <p><strong>Program Studi:</strong> ${prodi}</p>
    ${pdfEmbed}
    ${ytEmbed}
  `;
}

function extractDriveId(url) {
  const match = url.match(/[-\w]{25,}/);
  return match ? match[0] : "";
}

function convertYouTubeLink(url) {
  let videoId = "";
  if (url.includes("watch?v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1];
  }
  return `https://www.youtube.com/embed/${videoId}`;
}
