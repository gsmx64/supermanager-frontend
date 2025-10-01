import i18n from "i18next";

import InventoryIcon from "@/features/inventory/components/icons/InventoryIcon";
import StocksIcon from "@/features/stocks/components/icons/StocksIcon";
import DeploysIcon from "@/features/deploys/components/icons/DeploysIcon";
import ReportsIcon from "@/features/reports/components/icons/ReportsIcon";
import SettingsIcon from "@/core/components/icons/SettingsIcon";
import DashboardIcon from "@/core/components/icons/DashboardIcon";
import EyeFilledIcon from "@/core/components/icons/EyeFilledIcon";
import NotificationsIcon from "@/core/components/icons/NotificationsIcon";
import CalendarIcon from "@/core/components/icons/CalendarIcon";


type SidebarLinksProps = {
  isAdmin: boolean;
  isStaff: boolean;
}

const SidebarLinks = ({isAdmin, isStaff}: SidebarLinksProps) => {
  const iconClasses = `h-6 w-6`
  const submenuIconClasses = `h-4 w-4`

  const settingsSubmenu = [
    {
      path: '/settings',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.title'),
      main: 'Settings'
    },
    {
      path: '/settings/user',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.settings-user-title'),
      main: 'Settings'
    },
  ];

  const settingsAdmin = [
    {
      path: '/settings/app',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.settings-app-title'),
      main: 'Settings'
    },
    {
      path: '/settings/users',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.settings-users-title'),
      main: 'Settings'
    },
  ];

  const settingsStaff = [
    {
      path: '/settings/inventory',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.settings-inventory-title'),
      main: 'Settings'
    },
    {
      path: '/settings/deploys',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.settings-deploys-title'),
      main: 'Settings'
    },
    {
      path: '/settings/reports',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.settings-reports-title'),
      main: 'Settings'
    },
    {
      path: '/settings/stocks',
      icon: <SettingsIcon className={submenuIconClasses} />,
      title: i18n.t('settings.settings-stocks-title'),
      main: 'Settings'
    },
  ];

  if (isAdmin) {
    settingsSubmenu.push(...settingsAdmin);
  }

  if (isStaff) {
    settingsSubmenu.push(...settingsStaff);
  }

  const routes = [
    {
      path: '/dashboard',
      icon: <DashboardIcon className={iconClasses} />, 
      title: i18n.t('dashboard.title'),
    },
    {
      path: '/inventory',
      icon: <InventoryIcon className={iconClasses} />,
      title: i18n.t('inventory.title')
    },
    {
      path: '/deploys',
      icon: <DeploysIcon className={iconClasses} />,
      title: i18n.t('deploys.title')
    },
    {
      path: '/reports',
      icon: <ReportsIcon className={iconClasses} />,
      title: i18n.t('reports.title')
    },
    {
      path: '/stocks',
      icon: <StocksIcon className={iconClasses} />,
      title: i18n.t('stocks.title')
    },
    {
      path: '/calendar',
      icon: <CalendarIcon className={iconClasses} />,
      title: i18n.t('calendar.title')
    },
    {
      path: '/notifications',
      icon: <NotificationsIcon className={iconClasses} />,
      title: i18n.t('notifications.title')
    },
    {
      path: '',
      icon: <SettingsIcon className={`${iconClasses} inline`}/>,
      title: i18n.t('settings.title'),
      submenu: settingsSubmenu
    },
    {
      path: '', //no url needed as this has submenu
      icon: <EyeFilledIcon className={`${iconClasses} inline`}/>,
      title: 'Hidden pages (Dev Mode)',
      submenu: [
        {
          path: '/auth/login',
          icon: <EyeFilledIcon className={submenuIconClasses} />,
          title: i18n.t('auth.login-title'),
          main: 'Hidden pages (Dev Mode)'
        },
        {
          path: '/auth/register',
          icon: <EyeFilledIcon className={submenuIconClasses} />,
          title: i18n.t('auth.register-title'),
          main: 'Hidden pages (Dev Mode)'
        },
        {
          path: '/auth/forgot-password',
          icon: <EyeFilledIcon className={submenuIconClasses} />,
          title: i18n.t('auth.forgot-password-title'),
          main: 'Hidden pages (Dev Mode)'
        },
        {
          path: '/404',
          icon: <EyeFilledIcon className={submenuIconClasses} />,
          title: '404',
          main: 'Hidden pages (Dev Mode)'
        },
      ]
    },
  ];

  return routes;
};

export default SidebarLinks;