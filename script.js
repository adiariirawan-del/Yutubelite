
const input = document.getElementById("videoUrl");
const btn = document.getElementById("saveBtn");
const list = document.getElementById("videoList");
document.getElementById("year").textContent = new Date().getFullYear();

const savedVideos = JSON.parse(localStorage.getItem("videos") || "[]");
renderList();

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

function renderList() {
  list.innerHTML = "";
  savedVideos.forEach((url, i) => {
    const videoId = extractId(url);
    const li = document.createElement("li");
    li.innerHTML = videoId
      ? `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`
      : `<a href="${url}" target="_blank">${url}</a>`;
    list.appendChild(li);
  });
}

function extractId(url) {
  const reg = /(?:youtube\\.com.*(?:\\?|&)v=|youtu\\.be\\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(reg);
  return match ? match[1] : null;
}
