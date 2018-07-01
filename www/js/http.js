class Http {
    constructor() {
        this.http = new XMLHttpRequest();
    }

    get(url, callback) {
        this.http.open("GET", url);
        const self = this; // сохраняем контекст вызова
        this.http.addEventListener("load", function () {
           if (self.http.status === 200) {
               callback(null, self.http.responseText);
           } else {
               callback(`Error: ${self.http.status}`, null);
           }
        });

        this.http.send();
    }

    post(url, data, callback) {
        if (!data) return callback('Error: Data обязательный параметр');

        this.http.open("POST", url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранить контекст вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, self.http.responseText);
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send(JSON.stringify(data));
    }

    put(url, data, callback) {
        if (!data) return callback('Error: Data обязательный параметр');

        this.http.open("PUT", url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранить контекст вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, self.http.responseText);
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send(JSON.stringify(data));
    }

    delete(url, callback) {
        this.http.open("DELETE", url);
        this.http.setRequestHeader("Content-type", "application/json");

        const self = this; // сохранить контекст вызова
        this.http.addEventListener("load", function () {
            if (self.http.status === 200 || self.http.status === 201) {
                callback(null, "Post deleted");
            } else {
                callback(`Error: ${self.http.status}`, null);
            }
        });

        this.http.send();
    }
}

// делаем get запрос
// http.get("https://jsonplaceholder.typicode.com/users", function (err, res) {
//     // console.log(err, res);
// });

// делаем post запрос
// let data = {title: 'foo', body: 'bar', userId: 1};
// http.post("https://jsonplaceholder.typicode.com/posts", data, function (err, res) {
//   console.log(res);
// });


// http.get("https://newsapi.org/v2/top-headlines?country=ua&category=technology&apiKey=9402fb0f3ca64f93b20a21436749e13b", function (err, res) {
//     console.log(JSON.parse(res));
// });