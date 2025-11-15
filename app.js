const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImgTag = document.getElementById("lbImgTag");
const lbCaption = document.getElementById("lbCaption");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");
const downloadBtn = document.getElementById("downloadBtn");
const filterSelect = document.getElementById("filterType");

const images = [
  { id: 1015, src: "https://picsum.photos/id/1015/1200/800", thumb: "https://picsum.photos/id/1015/600/400", title: "Mountain Lake", category: "nature" },
  { id: 1025, src: "https://picsum.photos/id/1025/1200/800", thumb: "https://picsum.photos/id/1025/600/400", title: "Seagull", category: "nature" },
  { id: 1005, src: "https://picsum.photos/id/1005/1200/800", thumb: "https://picsum.photos/id/1005/600/400", title: "Portrait", category: "people" },
  { id: 180, src: "https://picsum.photos/id/180/1200/800", thumb: "https://picsum.photos/id/180/600/400", title: "Green Forest", category: "nature" },
  { id: 1069, src: "https://picsum.photos/id/1069/1200/800", thumb: "https://picsum.photos/id/1069/600/400", title: "Workstation", category: "tech" },
  { id: 1074, src: "https://picsum.photos/id/1074/1200/800", thumb: "https://picsum.photos/id/1074/600/400", title: "Smiling Person", category: "people" },
  { id: 1063, src: "https://picsum.photos/id/1063/1200/800", thumb: "https://picsum.photos/id/1063/600/400", title: "Server Room", category: "tech" },
  { id: 1011, src: "https://picsum.photos/id/1011/1200/800", thumb: "https://picsum.photos/id/1011/600/400", title: "Road Trip", category: "nature" }
];

let currentList = [...images];
let currentIndex = 0;

// Build gallery
function buildGallery(list) {
  gallery.innerHTML = "";
  list.forEach((imgObj, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = idx;
    card.dataset.cat = imgObj.category;
    card.innerHTML = `
      <img src="${imgObj.thumb}" alt="${imgObj.title}" />
      <div class="meta">
        <span>${imgObj.title}</span>
        <span>${imgObj.category}</span>
      </div>`;
    gallery.appendChild(card);
  });
}
buildGallery(images);

// Filter handling
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    currentList = cat === "all" ? [...images] : images.filter((i) => i.category === cat);
    buildGallery(currentList);
  });
});

// Open lightbox
gallery.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  currentIndex = Number(card.dataset.index);
  openLightbox(currentIndex);
});

function openLightbox(index) {
  if (index < 0) index = currentList.length - 1;
  if (index >= currentList.length) index = 0;
  currentIndex = index;
  const item = currentList[currentIndex];

  lbImgTag.src = item.src;
  lbCaption.textContent = `${item.title} — ${item.category}`;
  lbImgTag.style.filter = "none";
  filterSelect.value = "none";

  lightbox.classList.add("open");
}

// Navigation
nextBtn.addEventListener("click", () => openLightbox(currentIndex + 1));
prevBtn.addEventListener("click", () => openLightbox(currentIndex - 1));
closeBtn.addEventListener("click", () => lightbox.classList.remove("open"));
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("open");
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") lightbox.classList.remove("open");
  if (e.key === "ArrowRight") openLightbox(currentIndex + 1);
  if (e.key === "ArrowLeft") openLightbox(currentIndex - 1);
});

// Bonus filter inside lightbox
filterSelect.addEventListener("change", () => {
  lbImgTag.style.filter = filterSelect.value;
});

// Download image
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = lbImgTag.src;
  link.download = "image.jpg";
  link.click();
});
