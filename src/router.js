import VueRouter from 'vue-router'
import Vue from 'vue'
import IndexPage from "./components/IndexPage";
import ArticleContent from "./components/ArticleContent";
import ArticleContainer from "./components/ArticleContainer";

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