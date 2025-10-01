import type { MarkerIconProps } from "@/core/components/icons/MarkerIcon/types/MarkerIcon.type";


const MarkerIcon  = ({size, height, width, color, style, className}: MarkerIconProps) => {
  const sizeValue: string = typeof size === "number" ? `${size}px` : '';
  return (
    <svg
      viewBox="0 0 24 24"
      height={sizeValue || height || '1em'}
      width={sizeValue || width || '1em'}
      fill={color ? color : 'currentColor'}
      style={{...style}}
      //className={className ? className : "text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0"}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  );
};

export default MarkerIcon;