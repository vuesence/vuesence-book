import Vue from 'vue';

const VsbEventBus = new Vue();
export {VsbEventBus};

function loadArticle(url, callback) {
    fetch(url)
    .then((response) => response.text())
    .then((data) => {
        callback(data);
        // articles[record.id].content = data;
    });
}
export {loadArticle};