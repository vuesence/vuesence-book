import Vue from 'vue';
import marked from 'marked';
// import hljs from 'highlight.js';
// import MarkdownIt from 'markdown-it';

// marked.setOptions({
//     highlight: function(code) {
//       return hljs.highlightAuto(code).value;
//     }
// });

// let md = new MarkdownIt({
//     highlight: function (str, lang) {
//       if (lang && hljs.getLanguage(lang)) {
//         try {
//           return hljs.highlight(lang, str).value;
//         // eslint-disable-next-line no-empty
//         } catch (__) {}
//       }  
//       return ''; // use external default escaping
//     }
//   });

const VsbEventBus = new Vue();
export {VsbEventBus};

let articlePath;
function setArticlePath(ap) {
    articlePath = ap;
}
export {setArticlePath};

function loadArticle(url, callback) {
    fetch(articlePath + url)
    .then((response) => response.text())
    .then((data) => {
        if (url.endsWith(".md")) {
            data = marked(data);
            // data = md.render(data);
        }
        callback(data);
        // articles[record.id].content = data;
    });
}
export {loadArticle};