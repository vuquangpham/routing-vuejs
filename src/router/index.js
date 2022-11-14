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
    meta: { needAuth: true },
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
    beforeEnter(to, from, next) {
      console.log(to, from, next);
      next();
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

// navigation guard (for authentication)
router.beforeEach((to, from, next) => {
  // next(true/false)
  // next('/teams/t2')

  if (to.meta.needAuth) {
    // do some validate
  }

  next();
  // return;

  // if (to.name === "team-members") {
  //   next(true);
  // } else {
  //   // /teams/t2 => gap next() o duoi => /teams/t2 // infinite loop

  //   next({
  //     name: "team-members",
  //     path: {
  //       teamId: "t2",
  //     },
  //   });
  // }
});

export default router;
