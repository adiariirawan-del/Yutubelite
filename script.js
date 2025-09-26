const input = document.getElementById("videoUrl");
const btn = document.getElementById("saveBtn");
const list = document.getElementById("videoList");
document.getElementById("year").textContent = new Date().getFullYear();

const savedVideos = JSON.parse(localStorage.getItem("videos") || "[]");
renderList();

// Simpan link baru
btn.addEventListener("click", () => {
  const url = input.value.trim();
  if (!url) return;
  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    alert("Harap masukkan link YouTube yang valid.");
    return;
  }
  savedVideos.push(url);
  localStorage.setItem("videos", JSON.stringify(savedVideos));
  input.value = "";
  renderList();
});

// Render daftar video
function renderList() {
  list.innerHTML = "";
  savedVideos.forEach((url) => {
    const videoId = extractId(url);
    const li = document.createElement("li");
    if (videoId) {
      li.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>`;
    } else {
      li.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
    }
    list.appendChild(li);
  });
}

// Ambil ID video dari berbagai format URL
function extractId(url) {
  const reg =
    /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(reg);
  return match ? match[1] : null;
}
