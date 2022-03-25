const url = 'https://hex-escape-room.herokuapp.com';
const newsList = document.querySelector('.newsList');
const newsDetail = document.querySelector('.newsDetail');
const closeBtn = document.querySelector('.closeBtn');

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

function render(data) {
  let result = '';
  data.forEach((item) => {
    result += `
      <div class="col">
              <div class="card bg-dark text-white card-gradient"><img src="${item.urlToImage}" class="card-img" alt="news image">
                <div class="card-img-overlay">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">2022/2/15 上午5:30:00</p><a href="#" class="moreDetail stretched-link" data-id='${item.id}'></a>
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
      console.log(parseInt(event.target.dataset.id))
      getNewsDetail(parseInt(event.target.dataset.id))
    })
  })
}

init();

function getNewsDetail(id) {
  newsDetail.classList.remove('d-none')
  const detailurl = `${url}/api/cors/news/${id}`;
  console.log(detailurl)
  axios.get(detailurl)
    .then((res) => {
      console.log(res)
    })
}

closeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  newsDetail.classList.add('d-none');
})