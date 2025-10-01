type InventoryIconProps = {
  size?: number;
  height?: string;
  width?: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
};

const InventoryIcon = ({size, height, width, color, style, className}: InventoryIconProps) => {
  const sizeValue: string = typeof size === "number" ? `${size}px` : '';
  return (
    <svg
      viewBox="0 0 32 32"
      height={sizeValue || height || "2rem"}
      width={sizeValue || width || "2rem"}
      fill={color ? color : "currentColor"}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="19" y="24" width="4" height="4" />
      <rect x="26" y="24" width="4" height="4" />
      <rect x="19" y="17" width="4" height="4" />
      <rect x="26" y="17" width="4" height="4" />
      <path
        d="M17,24H4V10H28v5h2V10a2.0023,2.0023,0,0,0-2-2H22V4a2.0023,2.0023,0,0,0-2-2H12a2.002,2.002,0,0,0-2,2V8H4a2.002,2.002,0,0,0-2,2V24a2.0023,2.0023,0,0,0,2,2H17ZM12,4h8V8H12Z"
      />
    </svg>
  );
};

export default InventoryIcon;