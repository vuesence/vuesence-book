import VueRouter from 'vue-router'
import Vue from 'vue'
import IndexPage from "./components/article/IndexPage";
import ArticleContent from "./components/article/ArticleContent";
import ArticleContainer from "./components/article/ArticleContainer";

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
            path: '/article',
            component: ArticleContainer,
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