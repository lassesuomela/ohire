import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/views/NotFound.vue";
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
    {
        path: "/:catchAll(.*)",
        component: NotFound,
        name: "NotFound"
    },
    {
        path: "/",
        component: HelloWorld,
        name: "HelloWorld"
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;