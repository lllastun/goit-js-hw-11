import SimpleLightbox from 'simplelightbox';
import getSearchRequest from './create-seach-request';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormElement = document.querySelector('.search-form');
const galleryElement = document.querySelector('.gallery');
const loadMoreElement = document.querySelector('.load-more');
const inpValueEl = searchFormElement.elements.searchQuery;

let page = 0;
let totalImageOnScreen = 0;
let totalHits = 0;

const styleElement = document.createElement('style');
styleElement.textContent =
  '.gallery { margin-top: 22px; margin-bottom: 22px; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; } .photo-card {width: 400px; height: 320px; display: flex; flex-direction: column; justify-content: flex-end; box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); } .info {display: flex; justify-content: space-around;} .info-item {display: flex; flex-direction: column; align-items: center; gap: 4px;} .photo-card img{object-fit: fill; width: 100%; height: auto;} .hide {display: none;} .link-img {max-height: 248px; overflow: hidden;}';

document.head.appendChild(styleElement);
loadMoreElement.classList.add('hide');

function clearGallery() {
  galleryElement.innerHTML = '';
  totalImageOnScreen = 0;
}

function loadMoreRefresh() {
  if (totalImageOnScreen < totalHits) {
    loadMoreElement.classList.remove('hide');
  } else {
    loadMoreElement.classList.add('hide');
  }
}

function createCards(data) {
  totalImageOnScreen = totalImageOnScreen + data.hits.length;
  // console.log(totalImageOnScreen);
  data.hits.forEach(data => {
    const likes = `<span class="info-value">${data.likes}</span>`;
    const views = `<span class="info-value">${data.views}</span>`;
    const comments = `<span class="info-value">${data.comments}</span>`;
    const downloads = `<span class="info-value">${data.downloads}</span>`;
    const previewURL = data.webformatURL;
    const tags = data.tags;
    const aLinkBigImg = `<a class="link-img" href="${data.largeImageURL}">`;
    const aCloseLink = `</a>`;
    galleryElement.insertAdjacentHTML(
      'beforeend',
      `<div class="photo-card">
       ${aLinkBigImg}
       <img src="${previewURL}" alt="${tags}" loading="lazy" />${aCloseLink}
       <div class="info">
         <p class="info-item"><b>Likes</b>${likes}</p>
         <p class="info-item"><b>Views</b>${views}</p>
         <p class="info-item"><b>Comments</b>${comments}</p>
         <p class="info-item"><b>Downloads</b>${downloads}</p>
       </div>
    </div>`
    );
  });
  loadMoreRefresh();
}

searchFormElement.addEventListener('submit', handleSearch);
loadMoreElement.addEventListener('click', handleLoadMore);

function handleSearch(event) {
  event.preventDefault();
  clearGallery();
  const cards = [];
  page = +1;
  const inputSearh = inpValueEl.value;
  const searchRequest = getSearchRequest(inputSearh, page);
  // console.log(searchRequest);
  async function proc() {
    let data = await getData(searchRequest);
    createCards(data);
  }
  const data = proc();
}
async function getData(searchRequest) {
  const responce = await fetch(searchRequest);
  const data = await responce.json();
  totalHits = data.totalHits;
  // console.log(totalHits);
  return data;
}

function handleLoadMore(event) {
  page = page + 1;
  const req = inpValueEl.value;
  const searchRequest = getSearchRequest(req, page);
  async function proc() {
    let data = await getData(searchRequest);
    createCards(data);
  }
  const data = proc();
}
