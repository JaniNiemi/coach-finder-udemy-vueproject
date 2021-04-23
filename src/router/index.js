import {
  createRouter,
  createWebHistory
} from 'vue-router';
import store from "../store/index";

const routes = [{
    path: '/',
    redirect: '/coaches',
  },
  {
    path: '/coaches',
    name: 'coaches',
    component: () => import("../views/coaches/CoachesList.vue"),
  },
  {
    path: '/coaches/:id',
    name: 'coachPage',
    component: () => import('../views/coaches/CoachDetails.vue'),
    props: true,
    children: [{
      path: 'contact',
      component: () => import('../views/coaches/ContactCoach.vue')
    }]
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requireAuth: true,
      isCoach: true
    },
    component: () => import("../views/coaches/CoachRegistration.vue"),
  },
  {
    path: '/requests',
    name: 'requests',
    meta: {
      requireAuth: true
    },
    component: () => import("../views/Requests.vue"),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireUnAuth: true
    },
    component: () => import("../views/UserAuth.vue"),
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound',
    component: () => import("../views/NotFound.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requireUnAuth && store.getters.isAuthenticated) {
    next("/");
  } else if (to.meta.isCoach && store.getters["coaches/isCoach"]) {
    next("/");
  } else {
    next();
  }
});

export default router