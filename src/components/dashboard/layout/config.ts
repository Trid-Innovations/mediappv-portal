import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.overview, icon: 'chart-pie' },
  { key: 'history', title: 'Purchase History', href: paths.history, icon: 'history' },
  { key: 'account', title: 'Account', href: paths.account, icon: 'user' },
] satisfies NavItemConfig[];
