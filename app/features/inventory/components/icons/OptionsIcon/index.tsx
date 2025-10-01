type OptionsIconProps = {
  size?: number;
  height?: string;
  width?: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
};

const OptionsIcon = ({size, height, width, color, style, className}: OptionsIconProps) => {
  const sizeValue: string = typeof size === "number" ? `${size}px` : '';
  return (
    <svg
      viewBox="0 0 64 64"
      height={sizeValue || height || "8rem"}
      width={sizeValue || width || "8rem"}
      fill={color || "currentColor"}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Slider">
        <line
          x1="10"
          x2="54"
          y1="16"
          y2="16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8px"
        />
        <line
          x1="10"
          x2="54"
          y1="32"
          y2="32"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8px"
        />
        <line
          x1="10"
          x2="54"
          y1="48"
          y2="48"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8px"
        />
        <path d="M20,8a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z"/>
        <path d="M44,24a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z"/>
        <path d="M20,40a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z"/>
        <circle cx="20" cy="16" r="3"/>
        <circle cx="44" cy="32" r="3"/>
        <circle cx="20" cy="48" r="3"/>
      </g>
    </svg>
  );
};

export default OptionsIcon;