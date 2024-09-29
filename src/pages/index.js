
import { createRouter, createWebHistory } from 'vue-router'
import mainpage from './mainpage.vue'
import loginpage from './loginpage.vue'
import result500 from './resultPage_500.vue'
import profilepage from './profilepage.vue'
import postpage from './postpage.vue'
import userpage from './userpage.vue'
import searchpage from './searchpage.vue'
import registerpage from './registerpage.vue'
import writepostpage from './writepostpage.vue'
export default createRouter({
    routes: [{
        path: "/",
        component: mainpage
    },
    {
        path: "/login",
        component: loginpage
    }, {
        path: "/register",
        component: registerpage
    }, {
        path: "/post/:pid",
        component: postpage
    },
    {
        path: "/profile",
        component: profilepage
    },
    {
        path: "/:uid",
        component: userpage
    },
    {
        path: "/*",
        component: result500
    }, {
        path: "/search",
        component: searchpage
    }, {
        path: "/write",
        component: writepostpage
    }


    ],
    history: createWebHistory()
})