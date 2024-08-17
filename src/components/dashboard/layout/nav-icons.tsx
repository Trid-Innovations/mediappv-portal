import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { Money as MoneyIcon } from '@phosphor-icons/react/dist/ssr/Money';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';


export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  history: MoneyIcon,
} as Record<string, Icon>;