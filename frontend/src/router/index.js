import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import RegisterView from "@/views/RegisterView.vue";
import JobView from "@/views/JobView.vue";
import ProfileView from "@/views/ProfileView.vue";

import axios from "../axios";

const routes = [
    {
        path: "/:catchAll(.*)",
        component: NotFound,
        name: "NotFound"
    },
    {
        path: "/login",
        component: LoginView,
        name: "Login"
    },
    {
        path: "/logout",
        component: LogoutComponent,
        name: "Logout",
        meta: {
            auth: true
        }
    },
    {
        path: "/register",
        component: RegisterView,
        name: "Register"
    },
    {
        path: "/jobs",
        component: JobView,
        name: "Jobs",
        meta: {
            auth: true
        }
    },
    {
        path: "/profile",
        component: ProfileView,
        name: "Profile",
        meta: {
            auth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to) => {

    document.title = to.name;
    let isAuthenticated = false;

    if(!to.meta.auth){
        // if no auth is required then just let the user in
        return true;
    }

    axios.get('/user').then((response) => {
        if(response.data.status === "success"){
            isAuthenticated = true;

        }else{
            // incase of error status we dont let the user in
            return router.push('Login');
        }

        if(!isAuthenticated){
            return router.push('Login');
        }else{
            return true;
        }

    }).catch(error => {
        console.log(error);
        return router.push('Login');
    })
})

export default router;