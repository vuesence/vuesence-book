import Vue from 'vue';
import marked from 'marked'

const VsbEventBus = new Vue();
export {VsbEventBus};

let articlePath;
function setArticlePath(ap) {
    articlePath = ap;
}
export {setArticlePath};

function loadArticle(url, callback) {
    console.log("----");    
    console.log(articlePath);
    
    fetch(articlePath + url)
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