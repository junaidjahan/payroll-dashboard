import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import menuLinks from '../../helper-files/menuLinks.json'

interface MenuLink {
  path: string
  enabled: boolean
  title: string
}

// Map paths to view file names (PascalCase)
const pathToViewMap: Record<string, string> = {
  dashboard: 'Dashboard',
  'my-information': 'MyInformation',
  'my-payslips': 'MyPayslips',
  timesheet: 'Timesheet',
  leaves: 'Leaves',
  benefits: 'Benefits',
  orgchart: 'OrgChart',
  'my-team': 'MyTeam',
}

const menuRoutes: RouteRecordRaw[] = (menuLinks as MenuLink[])
  .filter((link) => link.enabled)
  .map((link) => ({
    path: `/${link.path}`,
    name: link.title,
    component: () => import(`../views/${pathToViewMap[link.path]}.vue`),
  }))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  ...menuRoutes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
