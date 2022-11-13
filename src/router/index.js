import { createRouter, createWebHistory } from "vue-router";
import TeamsList from "../components/teams/TeamsList.vue";
import TeamMembers from "../components/teams/TeamMembers.vue";
import UsersList from "../components/users/UsersList";
import NotFound from "../components/nav/NotFound";

const routes = [
  {
    path: "/",
    redirect: "/teams",
  },
  {
    path: "/teams",
    name: "team",
    component: TeamsList,
    children: [
      {
        path: ":teamId",
        name: "team-members",
        component: TeamMembers,
        props: true,
      },
    ],
  },
  {
    path: "/users",
    name: "users",
    component: UsersList,
  },
  {
    path: "/:notFound(/*)",
    component: NotFound,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
});

export default router;
