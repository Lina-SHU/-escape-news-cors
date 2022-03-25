const url = 'https://hex-escape-room.herokuapp.com';
const newsList = document.querySelector('.newsList');
const newsDetail = document.querySelector('.newsDetail');
const closeBtn = document.querySelector('.closeBtn');
const newsDetailContent = document.querySelector('.newsDetailContent');

/* cors anywhere */
(function () {
  var cors_api_host = 'escapecors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  var slice = [].slice;
  var origin = window.location.protocol + '//' + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host) {
      args[1] = cors_api_url + args[1];
    }
    return open.apply(this, args);
  };
})();

/* 取得新聞列表 */
let news = [];
function init() {
  const newsUrl = `${url}/api/cors/news`
  axios.get(newsUrl)
    .then((res) => {
      if (res.status === 200) {
        news = res.data.data;
        render(news);
      }
    })
}

/* 渲染新聞列表 */
function render(data) {
  let result = '';
  data.forEach((item) => {
    result += `
      <div class="col">
              <div class="card bg-dark text-white card-gradient"><img src="${item.urlToImage}" class="card-img" alt="news image">
                <div class="card-img-overlay">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.publishedAt.split('T')[0]} ${item.publishedAt.split('T')[1].split('Z')[0]}</p><a href="#" class="moreDetail stretched-link" data-id='${item.id}'></a>
                </div>
              </div>
            </div>
    `
  })

  newsList.innerHTML = result;
  // 監聽按鈕
  const moreBtn = document.querySelectorAll('.moreDetail')

  moreBtn.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      getNewsDetail(parseInt(event.target.dataset.id))
    })
  })
}

init();

/* 取得單一新聞 */
function getNewsDetail(id) {
  newsDetail.classList.remove('d-none')
  const detailurl = `${url}/api/cors/news/${id}`;
  axios.get(detailurl)
    .then((res) => {
      if (res.data.status === "success"){
        renderDetail(res.data.data);
      }
      
    })
}

/* 渲染單一新聞 */
function renderDetail(data) {
  newsDetailContent.innerHTML = `
    <h2 class="mt-3">${data.title}</h2>
    <span>${data.publishedAt.split('T')[0]} ${data.publishedAt.split('T')[1].split('Z')[0]}</span>
    <img src="${data.urlToImage}" class="img-fluid" alt="">
    <p>
      ${data.description}
    </p>
    <a href="${data.url}" target="blank">看更多</a>
  `;
}

// 監聽返回按鈕
closeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  newsDetail.classList.add('d-none');
})

