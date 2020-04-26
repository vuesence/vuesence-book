import VueRouter from 'vue-router'
import Vue from 'vue'
import IndexPage from "./pages/IndexPage";
import SomePage from "./pages/pages/SomePage";
import CustomPage from "./pages/CustomPage";

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
            component: CustomPage,
            children: [
                {
                    name: 'json-page',
                    path: ':id',
                    component: SomePage,
                },
            ]
        }
    ]
})