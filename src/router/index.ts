import RegisterUserVue from "@/views/RegisterUserVue.vue";
import TableUserView from "@/views/TableUserView.vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'RegisterUser',
    component: RegisterUserVue,
  },
  {
    path: '/users-table',
    name: 'UsersTable',
    component: TableUserView,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
