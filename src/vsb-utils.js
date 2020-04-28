import Vue from 'vue';
import marked from 'marked'

const VsbEventBus = new Vue();
export {VsbEventBus};

function loadArticle(url, callback) {
    fetch(url)
    .then((response) => response.text())
    .then((data) => {
        if (url.endsWith(".md")) {
            data = marked(data);
        }
        callback(data);
        // articles[record.id].content = data;
    });
}
export {loadArticle};