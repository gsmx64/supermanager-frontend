import {
  index,
  prefix,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout('core/layouts/default/index.tsx', [
    index('routes/root.tsx'),
    ...prefix("notifications", [
      index("core/features/notifications/components/Notifications/index.tsx"),
      //route("notification/:notificationId", "core/features/notifications/pages/Notification/index.tsx"),
    ]),
    route('/profile', 'core/features/users/pages/Profile/index.tsx'),
    route('/users/:userId', 'core/features/users/pages/UserProfile/index.tsx'),

    route('/dashboard', 'features/dashboard/pages/Dashboard/index.tsx'),
    ...prefix("inventory", [
      index("features/inventory/pages/Inventory/index.tsx"),
      route("locationzones", "features/inventory/pages/LocationZones/index.tsx"),
      route("locationzone/:locationZoneId", "features/inventory/pages/LocationsByLocationZone/index.tsx"),
      route("locations", "features/inventory/pages/Locations/index.tsx"),
      route("location/:locationId", "features/inventory/pages/DevicesByLocation/index.tsx"),
      route("device/:deviceId", "features/inventory/pages/Device/index.tsx"),
    ]),
    ...prefix("deploys", [
      index("features/deploys/index.tsx"),
      route("device/:deviceId", "features/deploys/pages/DeploysDevice/index.tsx"),
    ]),
    ...prefix("reports", [
      index("features/reports/index.tsx"),
      route("device/:deviceId", "features/reports/pages/ReportsDevice/index.tsx"),
    ]),
    ...prefix("stocks", [
      index("features/stocks/index.tsx"),
    ]),
    ...prefix("calendar", [
      index("features/calendar/index.tsx"),
    ]),
    ...prefix("settings", [
      index("features/settings/pages/Settings/index.tsx"),
      route("/app", "core/features/settings/pages/AppSettings/index.tsx"),
      route("/user", "core/features/settings/pages/UserSettings/index.tsx"),
      route("/inventory", "features/settings/inventory/pages/InventorySettings/index.tsx"),
      route("/deploys", "features/settings/deploys/pages/DeploysSettings/index.tsx"),
      route("/reports", "features/settings/reports/pages/ReportsSettings/index.tsx"),
      route("/stocks", "features/settings/stocks/pages/StocksSettings/index.tsx"),
      route("/users", "core/features/settings/pages/UsersList/index.tsx"),
    ]),
  ]),
  
  layout('core/layouts/auth/index.tsx', [
    ...prefix("auth", [
        route('/login', 'core/layouts/auth/components/Login/index.tsx'),
        route('/logout', 'core/layouts/auth/components/Logout/index.tsx'),
        route('/register', 'core/layouts/auth/components/Register/index.tsx'),
        route('/forgot-password', 'core/layouts/auth/components/ForgotPassword/index.tsx'),
    ]),
    route('/*', 'core/layouts/default/components/NotFound/index.tsx'),
  ]),

  
] satisfies RouteConfig;