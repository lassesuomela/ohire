import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutComponent from "@/components/LogoutComponent.vue";
import RegisterView from "@/views/RegisterView.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;