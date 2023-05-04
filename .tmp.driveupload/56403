const API = 'https://pixabay.com/api';
const API_KEY = '35997534-743ef0023491800c2d14ecb92';
const REQUEST_PARAMETRS = 'image_type=photo&orientation=horizontal&safesearch=true';
const perPage = 100;

export default function createSearchRequest(req, page){
  const arr = req.split(' ').join('+');
  return `${API}?key=${API_KEY}&q=${arr}&${REQUEST_PARAMETRS}&per_page=${perPage}&page=${page}`;
}

const imgxxx = 
{"id":736877,
"pageURL":"https://pixabay.com/photos/tree-cat-silhouette-moon-full-moon-736877/",
"type":"photo",
"tags":"tree, cat, silhouette",
"previewURL":"https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736877_150.jpg","previewWidth":150,
"previewHeight":100,
"webformatURL":"https://pixabay.com/get/ga2f80fad48972cdfd907fdea4eb3e2f584221bada9f6eee0c72eca6f72ff654bd86eac342230edb731913457b8475290_640.jpg",
"webformatWidth":640,
"webformatHeight":427,
"largeImageURL":"https://pixabay.com/get/ge6a263eba91129f6429d5f178f4008702b2d2d5776fbb41c487e1cee83d87eb6339a46a440bc96d41bfd8cbc7d016a716a6d005ccfd2fddcebeaf73bb9268be1_1280.jpg",
"imageWidth":1920,
"imageHeight":1282,
"imageSize":97150,
"views":1274759,
"downloads":652804,
"collections":2381,
"likes":2870,
"comments":577,
"user_id":909086,
"user":"Bessi",
"userImageURL":"https://cdn.pixabay.com/user/2019/04/11/22-45-05-994_250x250.jpg"}