type DeviceIconProps = {
  size?: number;
  height?: string;
  width?: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
};

const DeviceIcon = ({size, height, width, color, style, className}: DeviceIconProps) => {
  const sizeValue: string = typeof size === "number" ? `${size}px` : '';
  return (
    <svg
      viewBox="0 0 512 512"
      height={sizeValue || height || "24px"}
      width={sizeValue || width || "24px"}
      fill={color || "currentColor"}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M472,232H424V120a24.028,24.028,0,0,0-24-24H40a24.028,24.028,0,0,0-24,24V366a24.028,24.028,0,0,0,24,24H212v50H152v32H304V440H244V390h92v58a24.027,24.027,0,0,0,24,24H472a24.027,24.027,0,0,0,24-24V256A24.027,24.027,0,0,0,472,232ZM336,256V358H48V128H392V232H360A24.027,24.027,0,0,0,336,256ZM464,440H368V264h96Z"
      />
    </svg>
  );
};

export default DeviceIcon;