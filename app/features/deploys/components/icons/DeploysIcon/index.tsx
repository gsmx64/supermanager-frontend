type DeploysIconProps = {
  size?: number;
  height?: string;
  width?: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
};

const DeploysIcon = ({size, height, width, color, style, className}: DeploysIconProps) => {
  const sizeValue: string = typeof size === "number" ? `${size}px` : '';
  return (
    <svg
      viewBox="0 0 32 32"
      height={sizeValue || height || "20rem"}
      width={sizeValue || width || "20rem"}
      fill={color ? color : "currentColor"}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23,2,17,8l1.4146,1.4023L22,5.8184V28H6V12H4V28a2.0025,2.0025,0,0,0,2,2H22a2.0025,2.0025,0,0,0,2-2V5.8154l3.5859,3.5869L29,8Z"
      />
      <path
        d="M16,24H12a2.0023,2.0023,0,0,1-2-2V18a2.0023,2.0023,0,0,1,2-2h4a2.0023,2.0023,0,0,1,2,2v4A2.0023,2.0023,0,0,1,16,24Zm-4-6v4h4V18Z"
      />
    </svg>
  );
};

export default DeploysIcon;