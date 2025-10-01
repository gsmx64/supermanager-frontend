import { Link } from "react-router";
import { Divider } from "@heroui/react";
import type { SVGProps } from "react";

import { ThemeSwitcher } from "@/core/components/buttons/ThemeSwitcher";
import LanguageSwitcher from "@/core/components/buttons/LanguageSwitcher";
import ProfileOptions from "@/core/features/users/components/menus/ProfileOptions";
import { NotificationBell } from "@/core/layouts/default/components/NotificationBell";
import SearchBar from "@/core/layouts/default/components/SearchBar";
import { CORE_BRAND } from "@/core/consts/consts";
import SMLogo from "@/core/components/branding/SMLogo";


export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export function Header() {
  return (
    <header className="sticky z-10 w-full bg-white shadow-md flex items-center h-16 dark:bg-gray-900">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold ml-2">
        <Link to={'../'} className="flex items-center gap-3">
          <SMLogo size={80} className="object-contain rounded-lg shadow" />
          <span className="font-bold text-2xl text-primary">
            {CORE_BRAND}
          </span>
        </Link>
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <SearchBar />
        <LanguageSwitcher />
        <ThemeSwitcher />
        <NotificationBell />
        <Divider orientation="vertical" />
        <ProfileOptions />
        <Divider orientation="vertical" />
      </div>
    </header>
  )
}
