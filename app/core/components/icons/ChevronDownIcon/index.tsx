import type { ChevronDownIconProps } from "@/core/components/icons/ChevronDownIcon/types/ChevronDownIcon.type";


const ChevronDownIcon  = ({size, height, width, color, style, className}: ChevronDownIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height={size || height || '1em'}
      width={size || width || '1em'}
      fill={color ? color : 'currentColor'}
      style={style}
      className={className ? className : "text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0"}
    >
      <path
        d="M6 9L12 15L18 9"
      />
    </svg>
  );
};

export default ChevronDownIcon;