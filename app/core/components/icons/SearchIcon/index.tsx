import type { SearchIconProps } from "@/core/components/icons/SearchIcon/types/SearchIcon.type";


const SearchIcon  = ({size, height, width, color, style, className}: SearchIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height={size || height || '1em'}
      width={size || width || '1em'}
      fill={color ? color : 'none'}
      focusable="false"
      aria-hidden="true"
      role="presentation"
      style={style}
      className={className ? className : "text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0"}
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
};

export default SearchIcon;