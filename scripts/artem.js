let scale = 0.5, // Начальный масштаб 0.5
  posX = 0,
  posY = 0,
  startX,
  startY,
  isDragging = false;
const wrapper = document.querySelector(".video-wrapper");
const video = document.querySelector("#backgroundVideo");

// Ограничение перемещения
function clampPosition() {
  const videoRect = video.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();

  const minX = (wrapperRect.width - videoRect.width * scale) / 2;
  const maxX = -minX;
  const minY = (wrapperRect.height - videoRect.height * scale) / 2;
  const maxY = -minY;

  posX = Math.max(minX, Math.min(maxX, posX));
  posY = Math.max(minY, Math.min(maxY, posY));
}

// Применяем начальный масштаб сразу после загрузки страницы
function updateTransform() {
  wrapper.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;

  // Фиксируем размер точек, чтобы они не масштабировались вместе с видео
  document.querySelectorAll(".point").forEach((point) => {
    point.style.transform = `translate(-50%, -50%) scale(${1 / scale})`;
  });
}

// Устанавливаем масштаб при загрузке
window.addEventListener("load", () => {
  updateTransform();
});

// Перемещение видео
wrapper.addEventListener("pointerdown", (e) => {
  isDragging = true;
  startX = e.clientX - posX;
  startY = e.clientY - posY;
  wrapper.style.cursor = "grabbing";
});

window.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  posX = e.clientX - startX;
  posY = e.clientY - startY;
  clampPosition();
  updateTransform();
});

window.addEventListener("pointerup", () => {
  isDragging = false;
  wrapper.style.cursor = "grab";
});

// Масштабирование видео
document.getElementById("zoomIn").addEventListener("click", () => {
  scale = Math.min(scale + 0.1, 2);
  clampPosition();
  updateTransform();
});

document.getElementById("zoomOut").addEventListener("click", () => {
  scale = Math.max(scale - 0.1, 0.5);
  clampPosition();
  updateTransform();
});

// Открытие модальных окон
const points = document.querySelectorAll(".point");
points.forEach((point) => {
  point.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    showModal(id);
  });
});

function showModal(id) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");

  if (
    document
      .querySelector(`[data-id="${id}"]`)
      .classList.contains("point-large")
  ) {
    modalImage.style.display = "none";
    modalVideo.style.display = "block";

    if (id === "3") modalVideo.src = "../images/01-Cam_Park.mp4";
    if (id === "2") modalVideo.src = "../images/02-Cam_Stock.mp4";
    if (id === "1") modalVideo.src = "../images/03-Cam_ABK.mp4";
  } else {
    modalImage.style.display = "block";
    modalVideo.style.display = "none";
    modalImage.src = "Point_20-08.png"; // Здесь можно подставить нужное фото
  }

  modal.style.display = "block";
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// Переключение языка
document.getElementById("langButton").addEventListener("click", (event) => {
  event.stopPropagation();
  const langMenu = document.getElementById("langMenu");

  // Переключаем класс hidden
  if (langMenu.classList.contains("hidden")) {
    langMenu.classList.remove("hidden");
    langMenu.style.display = "block"; // Добавлено для надежности
  } else {
    langMenu.classList.add("hidden");
    langMenu.style.display = "none"; // Добавлено для надежности
  }
});

// Закрываем список, если клик вне него
document.addEventListener("click", (event) => {
  const langMenu = document.getElementById("langMenu");
  if (!event.target.closest(".lang-switcher")) {
    langMenu.classList.add("hidden");
    langMenu.style.display = "none";
  }
});

document.querySelectorAll("#langMenu li").forEach((item) => {
  item.addEventListener("click", (e) => {
    const lang = e.target.dataset.lang;
    console.log("Выбран язык:", lang);
    document.getElementById("langMenu").classList.add("hidden");
    document.getElementById("langMenu").style.display = "none";
  });
});
