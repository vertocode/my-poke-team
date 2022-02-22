import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MyTeams",
    component: () => import("../views/MyTeams.vue"),
  },
  {
    path: "/createteam",
    name: "CreateTeam",
    component: () => import("../views/CreateTeam.vue"),
  },
  {
    path: "/team/:id",
    name: "Team",
    component: () => import("../views/Team.vue"),
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import("../views/Test.vue")
  }
];

export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
