type LocationIconProps = {
  size?: number;
  height?: string;
  width?: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
};

const LocationIcon = ({size, height, width, color, style, className}: LocationIconProps) => {
  const sizeValue: string = typeof size === "number" ? `${size}px` : '';
  return (
    <svg
      viewBox="0 0 24 24"
      height={sizeValue || height || "120rem"}
      width={sizeValue || width || "120rem"}
      fill={color || "currentColor"}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21,8H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V8H3A1,1,0,0,0,2,9V22h9V19a1,1,0,0,1,2,0v3h9V9A1,1,0,0,0,21,8ZM6,20H4V18H6Zm0-4H4V14H6Zm0-4H4V10H6Zm7,3H11V13h2Zm0-4H11V9h2Zm0-4H11V5h2Zm7,13H18V18h2Zm0-4H18V14h2Zm0-4H18V10h2Z"
      />
    </svg>
  );
};

export default LocationIcon;