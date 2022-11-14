import { createRouter, createWebHistory } from "vue-router";
import TeamsList from "../components/teams/TeamsList.vue";
import TeamMembers from "../components/teams/TeamMembers.vue";
import UsersList from "../components/users/UsersList";
import NotFound from "../components/nav/NotFound";
import TeamFooter from "../components/teams/TeamFooter";
import UserFooter from "../components/users/UserFooter";

const routes = [
  {
    path: "/",
    redirect: "/teams",
  },
  {
    path: "/teams",
    name: "team",
    components: {
      default: TeamsList,
      footer: TeamFooter,
    },
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
    components: {
      default: UsersList,
      footer: UserFooter,
    },
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
  scrollBehavior(to, from, savedPosition) {
    // to, from ~~ similar to this.$route
    // savedPosition is only set when we use the "back-button"
    // when back to what's left
    // return the object that browser should scroll To

    console.log("to:", to);
    console.log("from:", from);
    console.log("savedPosition:", savedPosition);

    if (savedPosition) {
      return savedPosition;
    }

    return {
      top: 0,
      left: 0,
    };
  },
});

export default router;
