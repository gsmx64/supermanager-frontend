import type { PasswordIconProps } from "@/core/components/icons/PasswordIcon/types/PasswordIcon.type";


const PasswordIcon  = ({size, height, width, color, style, className}: PasswordIconProps) => {
  return (
    <svg
      viewBox="0 0 48 48"
      height={size || height || '1em'}
      width={size || width || '1em'}
      fill={color ? color : 'currentColor'}
      focusable="false"
      aria-hidden="true"
      role="presentation"
      style={style}
      className={className ? className : "text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0"}
    >
      <g>
        <path d="M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM37,42H9V22H37Z"/>
        <circle cx="15" cy="32" r="3"/>
        <circle cx="23" cy="32" r="3"/>
        <circle cx="31" cy="32" r="3"/>
      </g>
    </svg>
  );
};

export default PasswordIcon;