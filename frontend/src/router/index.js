import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import RegisterView from "@/views/RegisterView.vue";
import RegisterCompanyView from "@/views/RegisterCompanyView.vue";
import JobView from "@/views/JobView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CreateJobsView from "@/views/CreateJobsView.vue";
import ViewMoreJobView from "@/views/ViewMoreJobView.vue";
import ApplyView from "@/views/ApplyView.vue";
import ApplicationsView from "@/views/ApplicationsView.vue";

import axios from "../axios";
import store from '../store';

const routes = [
    {
        path: "/:catchAll(.*)",
        component: NotFound,
        name: "NotFound"
    },
    {
        path: "/",
        component: LoginView,
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
        path: "/registerCompany",
        component: RegisterCompanyView,
        name: "Register Company"
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
        path: "/job/:id",
        component: ViewMoreJobView,
        name: "Job",
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
    {
        path: "/createJobs",
        component: CreateJobsView,
        name: "Create job listings",
        meta: {
            auth: true,
            corporateUserNeeded: true
        }
    },
    {
        path: "/apply/:id",
        component: ApplyView,
        name: "Apply for a job",
        meta: {
            auth: true,
        }
    },
    {
        path: "/applications",
        component: ApplicationsView,
        name: "Applications",
        meta: {
            auth: true,
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to) => {

    // this is to 'fix' ghost token 
    if(to.name === 'Logout' && localStorage.getItem('token')){
        router.go();
    }

    document.title = to.name;
    let isAuthenticated = false;

    if(!to.meta.auth){
        // if no auth is required then just let the user in
        return true;
    }

    if(to.meta.corporateUserNeeded){
        if(store.state.role === 2){
            return true;
        }else{
            return router.push('Jobs');
        }
    }

    axios.get('/user').then((response) => {

        if(response.data.status === "success"){
            isAuthenticated = true;

        }else{
            // incase of error status we dont let the user in
            localStorage.removeItem('token');
            return router.push('Login');
        }

        // if user is not authenticated then go to login page else let in to other page
        if(!isAuthenticated){
            localStorage.removeItem('token');
            return router.push('Login');
        }else{

            return true;
        }

    }).catch(error => {
        console.log(error);
        localStorage.removeItem('token');
        return router.push('Login');
    })
})

export default router;