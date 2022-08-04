import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import RegisterView from "@/views/RegisterView.vue";
import JobView from "@/views/JobView.vue";

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
        name: "Logout"
    },
    {
        path: "/register",
        component: RegisterView,
        name: "Register"
    },
    {
        path: "/jobs",
        component: JobView,
        name: "Jobs"
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;