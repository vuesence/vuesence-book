import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/help',
            children: [
                {
                    name: 'article',
                    path: ':id',
                },
            ]
        }
    ]
})