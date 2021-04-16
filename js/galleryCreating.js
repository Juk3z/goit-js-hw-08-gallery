import gallery from "../gallery-items.js"
const galleryListEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalImgEl = document.querySelector('.lightbox__image')
const closeBtnEl = document.querySelector('button[data-action="close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');

const imgLinksArray = [];
let imgLink = '';

// --------------------- создание галереии в html
makingListItems(gallery);
function makingListItems(object) {
  const listItemArray = object.map(item => {
    imgLinksArray.push(item.original);
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${item.original}"
      >
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>`
    });
  galleryListEl.insertAdjacentHTML('beforeend', listItemArray.join(''));
  
};

// -------------------- получение ссылки на оригинальное фото при клике
galleryListEl.addEventListener('click', letOriginalImg);
function letOriginalImg(e) {
    e.preventDefault();
    if (e.target.hasAttribute('data-source')) {
      imgLink = e.target.dataset.source;
      openModal();
  };
};

// ---------------- выпадение модального окна при клике на фото
function openModal() {
  modalEl.classList.toggle('is-open');
  modalImgEl.setAttribute('src', imgLink);
  controlModal();
};
function controlModal() {
  modalEl.addEventListener('click', closeBtn)
  modalEl.addEventListener('click', overlayClose);
  window.addEventListener('keydown', escapeClose);
  window.addEventListener('keydown', photoSlider);
};

// ------------------ элементы управления модальным окном
function closeBtn(e) {
  if (e.target === closeBtnEl) {
    modalEl.classList.toggle('is-open');
    modalImgEl.setAttribute('src', '#');

    modalEl.removeEventListener('click', closeBtn);
    modalEl.removeEventListener('click', overlayClose);
    window.removeEventListener('keydown', escapeClose);
    window.removeEventListener('keydown', photoSlider);
  };
};

function overlayClose(e) {
  if (e.target === overlayEl) {
    modalEl.classList.toggle('is-open');
    modalImgEl.setAttribute('src', '#');

    modalEl.removeEventListener('click', closeBtn);
    modalEl.removeEventListener('click', overlayClose);
    window.removeEventListener('keydown', escapeClose);
    window.removeEventListener('keydown', photoSlider);
  };
};

function escapeClose(e) {
  if (e.code === 'Escape') {
    modalEl.classList.toggle('is-open');
    modalImgEl.setAttribute('src', '#');

    modalEl.removeEventListener('click', closeBtn);
    modalEl.removeEventListener('click', overlayClose);
    window.removeEventListener('keydown', escapeClose);
    window.removeEventListener('keydown', photoSlider);
  };
};

function photoSlider(e) {
  const linkNumberOfArray = imgLinksArray.indexOf(modalImgEl.getAttribute('src'));

  if (e.code === 'ArrowRight' && (linkNumberOfArray + 1) < imgLinksArray.length) {
    modalImgEl.setAttribute('src', imgLinksArray[linkNumberOfArray + 1]);
  };

  if (e.code === 'ArrowLeft' && linkNumberOfArray !== 0) {
  modalImgEl.setAttribute('src', imgLinksArray[linkNumberOfArray - 1])
  };
};
