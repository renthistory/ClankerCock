(function () {
  const videos = window.CLANKER_VIDEOS || [];
  const grid = document.getElementById("grid");
  const search = document.getElementById("search");
  const tagRow = document.getElementById("tags");
  const modal = document.getElementById("modal");
  const embed = document.getElementById("embed");
  const modalTitle = document.getElementById("modalTitle");
  const countEl = document.getElementById("count");

  const allTags = [...new Set(videos.flatMap((v) => v.tags || []))].sort();
  let activeTag = "";

  function embedUrl(id) {
    return "https://www.redgifs.com/ifr/" + id;
  }

  allTags.forEach((tag) => {
    const b = document.createElement("button");
    b.className = "tag";
    b.textContent = tag;
    b.addEventListener("click", () => {
      activeTag = activeTag === tag ? "" : tag;
      [...tagRow.querySelectorAll(".tag")].forEach((el) => {
        el.classList.toggle("active", el.textContent === activeTag);
      });
      render();
    });
    tagRow.appendChild(b);
  });

  function filtered() {
    const q = (search.value || "").toLowerCase().trim();
    return videos.filter((v) => {
      const hay = ((v.title || "") + " " + (v.tags || []).join(" ")).toLowerCase();
      const tagOk = !activeTag || (v.tags || []).includes(activeTag);
      return tagOk && (!q || hay.includes(q));
    });
  }

  function render() {
    const list = filtered();
    grid.innerHTML = "";
    countEl.textContent = list.length + " clip" + (list.length === 1 ? "" : "s");
    if (!list.length) {
      grid.innerHTML = '<div class="empty">Nothing matches.</div>';
      return;
    }
    list.forEach((v) => {
      const card = document.createElement("article");
      card.className = "card";
      const img = document.createElement("img");
      img.className = "thumb-img";
      img.src = v.poster;
      img.alt = v.title;
      img.onerror = function () {
        if (v.posterRemote && img.src !== v.posterRemote) img.src = v.posterRemote;
      };
      const body = document.createElement("div");
      body.className = "card-body";
      body.innerHTML =
        "<h3>" + v.title + "</h3>" +
        '<div class="pills">' +
        (v.tags || []).map((t) => '<span class="pill">' + t + "</span>").join("") +
        "</div>";
      card.appendChild(img);
      card.appendChild(body);
      card.addEventListener("click", () => openModal(v));
      grid.appendChild(card);
    });
  }

  function openModal(v) {
    modalTitle.textContent = v.title;
    embed.src = embedUrl(v.id);
    modal.classList.add("open");
  }
  function closeModal() {
    modal.classList.remove("open");
    embed.src = "";
  }

  document.getElementById("closeModal").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
  search.addEventListener("input", render);

  document.getElementById("enter").addEventListener("click", () => {
    document.getElementById("gate").classList.add("hidden");
    sessionStorage.setItem("clanker-ok", "1");
  });
  document.getElementById("leave").addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
  if (sessionStorage.getItem("clanker-ok") === "1") {
    document.getElementById("gate").classList.add("hidden");
  }

  render();
})();
