const API = 'https://pixabay.com/api/';
const API_KEY = '35997534-743ef0023491800c2d14ecb92';
const REQUEST_PARAMETRS = 'image_type=photo&orientation=horizontal&safesearch=true';
const perPage = 40;

export default function createSearchRequest(req, page){
  const arr = req.split(' ').join('+');
  return `${API}?key=${API_KEY}&q=${arr}&${REQUEST_PARAMETRS}&per_page=${perPage}&page=${page}`;
}

