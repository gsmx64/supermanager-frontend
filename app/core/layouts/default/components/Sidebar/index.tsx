import { useState } from "react";
import { NavLink, useLocation} from "react-router";

import { useAuth } from "@/core/hooks/useAuth";
import SidebarLinks from "@/routes/sidebar";
import { MenuItem } from "@/core/layouts/default/components/Sidebar/components/MenuItem";

const sidebarWidthCollapsed = "w-[48px]";
const sidebarWidthExpanded = "w-80";
const sidebarItemCollapsed = "flex items-center gap-2 px-4 py-2 justify-center transition-all duration-200";
const sidebarItemExpanded = "flex items-center gap-2 px-4 py-2 transition-all duration-200";
const sidebarItemActive = "bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 font-bold";
const sidebarItemInactive = "bg-gray-100 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 font-normal";
const sidebarContainerBase = "bg-gray-100 dark:bg-gray-900 min-h-full transition-all duration-200";

export function Sidebar() {
  const { isAdmin, isStaff } = useAuth();
  let routes = SidebarLinks({isAdmin, isStaff});

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleMouseEnter = () => {
    setCollapsed(false);
  }
  const handleMouseOver = () => {
    if (!collapsed) return;
    setCollapsed(false);
  }
  const handleMouseLeave = () => {
    setCollapsed(true);
    setExpandedIndex(null);
  };

  // Helper to check if any submenu item is active for a route
  const isSubmenuActive = (route: typeof routes[number]) => {
    if (!route.submenu) return false;
    return route.submenu.some((m) => location.pathname === m.path && route.title === m.main);
  };

  return (
    <div
      className={`${collapsed ? sidebarWidthCollapsed : sidebarWidthExpanded} ${sidebarContainerBase}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
    >
      <ul className="flex flex-col min-h-full">
        {routes.map((route, k) => (
          <li key={k}>
            {(route.submenu === undefined) ? (
            <NavLink
              end
              to={route.path}
              className={({ isActive }) =>
                `${collapsed ? sidebarItemCollapsed : sidebarItemExpanded} ${isActive || isSubmenuActive(route) ? sidebarItemActive : sidebarItemInactive} relative`
              }
            >
              <MenuItem
                route={route}
                k={k}
                collapsed={collapsed}
                expandedIndex={expandedIndex}
                sidebarItemCollapsed={sidebarItemCollapsed}
                sidebarItemExpanded={sidebarItemExpanded}
                sidebarItemActive={sidebarItemActive}
                sidebarItemInactive={sidebarItemInactive}
                isSubmenuActive={isSubmenuActive}
                setExpandedIndex={setExpandedIndex}
              />
            </NavLink>
            ) : (
              <MenuItem
                route={route}
                k={k}
                collapsed={collapsed}
                expandedIndex={expandedIndex}
                sidebarItemCollapsed={sidebarItemCollapsed}
                sidebarItemExpanded={sidebarItemExpanded}
                sidebarItemActive={sidebarItemActive}
                sidebarItemInactive={sidebarItemInactive}
                isSubmenuActive={isSubmenuActive}
                setExpandedIndex={setExpandedIndex}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
