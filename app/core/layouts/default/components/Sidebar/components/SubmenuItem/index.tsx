import type React from "react"
import { Link, useLocation } from "react-router"

type submenuProps = {
  path: string,
  icon: React.JSX.Element,
  title: string,
  main: string
}

type SubmenuItemProps = {
  i: number,
  m: submenuProps,
  k: number,
  expandedIndex: number | null,
  sidebarItemActive: string,
  sidebarItemInactive: string,
}

export function SubmenuItem({ m, i, k, expandedIndex, sidebarItemActive, sidebarItemInactive }: SubmenuItemProps){
  const location = useLocation();

  return(
    <li key={i}>
      <Link to={m.path}>
        <div
          className={
            `flex pt-1 pb-1 ${(location.pathname === m.path) && (k === expandedIndex) ?
            sidebarItemActive : sidebarItemInactive}`
          }
        >
          <div className="flex items-center mr-2 shrink-0">
            {m.icon}
          </div>
          <div className="text-sm">
            {m.title}
          </div>
        </div>
      </Link>
    </li>
  )
}