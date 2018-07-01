// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "9402fb0f3ca64f93b20a21436749e13b";

// Init elements
const select = document.getElementById("country");
const resourse = document.getElementById("resourse");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");

// All events
select.addEventListener("change", onChangeCountry);
resourse.addEventListener("change", onChangeResourses);
category.addEventListener("change", onChangeCategory);
searchBtn.addEventListener("click", onSearch);

// Event handlers
function onChangeCountry(e) {
    // Показываю прелоадер
    ui.showLoader();
    // Делаем запрос на получение новостей по выбранной стране
    http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`, function (err, res) {
        if (!err) {
            // Преобразовываем из JSON в обыч объект
            const response = JSON.parse(res);
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // Перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
        } else {
            // Выводим ошибку
            ui.showError(err);
        }

    });
}

// Category
function onChangeCategory(e) {
    ui.showLoader();
    http.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${category.value}&apiKey=${apiKey}`, function (err, res) {
        if (!err) {
            const response = JSON.parse(res);
            ui.clearContainer();
            response.articles.forEach(news => ui.addNews(news));
        } else {
            ui.showError(err);
        }

    });
}

function onSearch(e) {
    // Делаем запрос на получение новостей по поиску
    http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
        if (err) return ui.showError(err);
        const response = JSON.parse(res);
        if (response.totalResults) {
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // Перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
        } else {
            ui.showInfo("Нет новостей")
        }
    });
}

// Получение ресурсов
function getAllResourses() {
        http.get("https://newsapi.org/v2/sources?apiKey=9402fb0f3ca64f93b20a21436749e13b", function (err, res) {
            if (!err) {
                const response = JSON.parse(res);
                for (let i = 0; i < 10; i++) { // поставил 10 штук
                    let channel = new Option(response.sources[i].name, response.sources[i].id);
                    resourse.insertAdjacentElement("beforeend", channel);
                    $(document).ready(function(){
                        $('select').formSelect();
                    });
                }
            } else {
                ui.showError(err);
            }
        });
};
getAllResourses();
function onChangeResourses(e) {
    ui.showLoader();
    http.get(`https://newsapi.org/v2/top-headlines?sources=${resourse.value}&apiKey=${apiKey}`, function (err, res) {
        if (!err) {
            const response = JSON.parse(res);
            ui.clearContainer();
            response.articles.forEach(news => ui.addNews(news));
        } else {
            ui.showError(err);
        }

    });
}