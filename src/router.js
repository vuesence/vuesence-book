import VueRouter from 'vue-router'
import Vue from 'vue'
import IndexPage from "./pages/IndexPage";
import ArticleContent from "./pages/pages/ArticleContent";
import BookArticle from "./pages/BookArticle";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'index',
            component: IndexPage,
            path: '/'
        },
        {
            name: 'pages',
            path: '/pages',
            component: BookArticle,
            children: [
                {
                    name: 'json-page',
                    path: ':id',
                    component: ArticleContent,
                },
            ]
        }
    ]
})