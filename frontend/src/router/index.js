import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import LoginView from "@/views/LoginView.vue";

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;