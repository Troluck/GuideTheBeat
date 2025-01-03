import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import HomePage from "../views/HomePage.vue";
import EditGuidePage from "../views/EditGuidePage.vue";
import CreateGuidePage from "../views/CreateGuidePage.vue";
import GuidePage from "../views/GuidePage.vue";
import ProfilPage from "../views/ProfilPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },
    {
      path: "/createguide",
      name: "CreateGuide",
      component: CreateGuidePage,
    },
    {
      path: "/editGuide/:guidename?",
      name: "editGuide",
      component: EditGuidePage,
    },
    {
      path: "/guide/:id",
      name: "GuidePage",
      component: GuidePage,
    },
    {
      path: "/profilPage",
      name: "ProfilPage",
      component: ProfilPage,
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    },
  ],
});

export default router;
