import SimpleLightbox from 'simplelightbox';
import axios, { isCancel, AxiosError } from 'axios';
import { Notify } from 'notiflix';
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
  if (totalImageOnScreen === totalHits) {
    galleryElement.insertAdjacentHTML(
    'afterend',
    `<p>We're sorry, but you've reached the end of search results.<p>`)}
}

function createCards(data) {
  totalImageOnScreen = totalImageOnScreen + data.hits.length;
   if (totalHits===0) {Notify.failure(
    `Sorry, there are no images matching your search query. Please try again.`);
    return 
  }
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
// galleryElement.addEventListener('click', increaseImg);

function handleSearch(event) {
  event.preventDefault();
  clearGallery();
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
  const responce = await axios.get(searchRequest);
  // console.log(responce);
    try {
    const data = responce.data;
    totalHits = data.totalHits;
    return data;
  } catch (error) {
    console.error(error);
  }
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
