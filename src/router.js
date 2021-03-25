import Vue from 'vue'
import VueRouter from 'vue-router'
import Page1 from "./pages/Page1"
import Page2 from "./pages/Page2"

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Page1,
        },
        {
            path: '/contact/:id',
            component: Page2,
        }
    ]
})