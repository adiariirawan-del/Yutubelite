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
