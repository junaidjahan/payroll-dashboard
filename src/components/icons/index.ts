import { defineComponent, h } from 'vue'

// Import all icon components
import BenefitsIcon from './BenefitsIcon.vue'
import ChartIcon from './ChartIcon.vue'
import ChevronDownIcon from './ChevronDownIcon.vue'
import ChevronLeftIcon from './ChevronLeftIcon.vue'
import ChevronRightIcon from './ChevronRightIcon.vue'
import ChevronUpIcon from './ChevronUpIcon.vue'
import CloseIcon from './CloseIcon.vue'
import DashboardIcon from './DashboardIcon.vue'
import DocumentsIcon from './DocumentsIcon.vue'
import DotsVerticalIcon from './DotsVerticalIcon.vue'
import EmployeesIcon from './EmployeesIcon.vue'
import LaunchpadIcon from './LaunchpadIcon.vue'
import LeavesIcon from './LeavesIcon.vue'
import MinusIcon from './MinusIcon.vue'
import MyTeamIcon from './MyTeamIcon.vue'
import NewsIcon from './NewsIcon.vue'
import NotificationIcon from './NotificationIcon.vue'
import OrganizationalChartIcon from './OrganizationalChartIcon.vue'
import PlusIcon from './PlusIcon.vue'
import SalaryEvolutionIcon from './SalaryEvolutionIcon.vue'
import TimeEntryIcon from './TimeEntryIcon.vue'
import VerticalDotsIcon from './VerticalDotsIcon.vue'
import MenuIcon from './MenuIcon.vue'

// Icon registry mapping icon names (kebab-case) to components
export const iconRegistry: Record<string, ReturnType<typeof defineComponent>> = {
  benefits: BenefitsIcon,
  chart: ChartIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'chevron-up': ChevronUpIcon,
  close: CloseIcon,
  dashboard: DashboardIcon,
  documents: DocumentsIcon,
  'dots-vertical': DotsVerticalIcon,
  employees: EmployeesIcon,
  launchpad: LaunchpadIcon,
  leaves: LeavesIcon,
  minus: MinusIcon,
  'my-team': MyTeamIcon,
  news: NewsIcon,
  notification: NotificationIcon,
  'organizational-chart': OrganizationalChartIcon,
  plus: PlusIcon,
  'salary-evolution': SalaryEvolutionIcon,
  'time-entry': TimeEntryIcon,
  'vertical-dots': VerticalDotsIcon,
  menu: MenuIcon,
}

// Export all icon components
export {
  BenefitsIcon,
  ChartIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  DashboardIcon,
  DocumentsIcon,
  DotsVerticalIcon,
  EmployeesIcon,
  LaunchpadIcon,
  LeavesIcon,
  MinusIcon,
  MyTeamIcon,
  NewsIcon,
  NotificationIcon,
  OrganizationalChartIcon,
  PlusIcon,
  SalaryEvolutionIcon,
  TimeEntryIcon,
  VerticalDotsIcon,
  MenuIcon,
}
