import { useState } from "react";
import type React from "react"

import { SubmenuItem } from "@/core/layouts/default/components/Sidebar/components/SubmenuItem";
import ChevronDownIcon from "@/core/components/icons/ChevronDownIcon";


type submenuProps = {
  path: string,
  icon: React.JSX.Element,
  title: string,
  main: string
}

type routerProps = {
  path: string,
  icon: React.JSX.Element,
  title: string,
  submenu?: submenuProps[] | undefined
}

type MenuItemProps = {
  route: routerProps,
  k: number,
  collapsed: boolean,
  expandedIndex: number | null,
  sidebarItemCollapsed: string,
  sidebarItemExpanded: string,
  sidebarItemActive: string,
  sidebarItemInactive: string,
  isSubmenuActive: (route: routerProps) => boolean,
  setExpandedIndex: (index: number | null) => void,
  showChevron?: boolean,
}

type MenuItemBaseProps = {
  route: routerProps,
  k: number,
  collapsed: boolean,
  isChevronActive: boolean,
  setExpandedIndex: (index: number | null) => void
}

function MenuItemBase({
  route,
  k,
  collapsed,
  isChevronActive,
  setExpandedIndex
}: MenuItemBaseProps) {
  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden min-w-10 font-size-22`}
      onMouseEnter={route.submenu ? () => setExpandedIndex(k) : undefined}
    >
      <div
        className="inset-y-0"
        aria-hidden="true"
      >
        {route.icon}
      </div>
    
      {!collapsed && (
        <div
          className={`flex items-center justify-center ml-2 transition-all duration-300 ease-in-out overflow-hidden`}
        >
          {route.title}
          {route.submenu ? (
            <ChevronDownIcon
              width="50rem"
              height="50rem"
              color="currentColor"
              className={`w-5 h-5 ml-2 delay-400 duration-500 transition-all ${isChevronActive ? 'rotate-180' : ''}`}
            />
          ) : ''}
        </div>
      )}
    </div>
  );
}


export function MenuItem({
  route,
  k,
  collapsed,
  expandedIndex,
  sidebarItemCollapsed,
  sidebarItemExpanded,
  sidebarItemActive,
  sidebarItemInactive,
  isSubmenuActive,
  setExpandedIndex
}: MenuItemProps) {
  const [isChevronActive, setIsChevronActive] = useState(false);

  return (
    route.submenu ?
    (
      <div
        onMouseEnter={() => setIsChevronActive(true)}
        onMouseLeave={() => setIsChevronActive(false)}
      >
        <div className={`${collapsed ? sidebarItemCollapsed : sidebarItemExpanded} ${isSubmenuActive(route) ? sidebarItemActive : sidebarItemInactive} flex vertical-align relative`}>
          <MenuItemBase
            route={route}
            k={k}
            collapsed={collapsed}
            isChevronActive={isChevronActive}
            setExpandedIndex={setExpandedIndex}
          />
        </div>
        <div
          className={`w-full ${expandedIndex === k ? "" : "hidden"}`}
          onMouseLeave={() => { setExpandedIndex(null); }}
        >
          <ul className="flex flex-col pl-6 min-h-full">
            {route.submenu.map((m, i) => (
              <SubmenuItem
                key={i}
                m={m}
                i={i}
                k={k}
                expandedIndex={expandedIndex}
                sidebarItemActive={sidebarItemActive}
                sidebarItemInactive={sidebarItemInactive}
              />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <MenuItemBase
        route={route}
        k={k}
        collapsed={collapsed}
        isChevronActive={isChevronActive}
        setExpandedIndex={setExpandedIndex}
      />
    )
  )
}