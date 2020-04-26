import VueRouter from 'vue-router'
import Vue from 'vue'
import IndexPage from "./components/IndexPage";
// import ArticleContent from "./components/ArticleContent";
// import ArticleContainer from "./components/ArticleContainer";

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'index',
            component: IndexPage,
            path: '/'
        },
        {
            // name: 'pages',
            path: '/help',
            // component: ArticleContainer,
            children: [
                {
                    name: 'article',
                    path: ':id',
                    // component: ArticleContent,
                },
            ]
        }
    ]
})