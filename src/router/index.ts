import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/my-information',
    name: 'my-information',
    component: () => import('../views/MyInformation.vue'),
  },
  {
    path: '/my-payslips',
    name: 'my-payslips',
    component: () => import('../views/my-payslip/MyPayslips.vue'),
  },
  {
    path: '/timesheet',
    name: 'timesheet',
    component: () => import('../views/Timesheet.vue'),
  },
  {
    path: '/leaves',
    name: 'leaves',
    component: () => import('../views/Leaves.vue'),
  },
  {
    path: '/benefits',
    name: 'benefits',
    component: () => import('../views/Benefits.vue'),
  },
  {
    path: '/orgchart',
    name: 'orgchart',
    component: () => import('../views/OrgChart.vue'),
  },
  {
    path: '/my-team',
    name: 'my-team',
    component: () => import('../views/MyTeam.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
