type SerialIconProps = {
  size?: number;
  height?: string;
  width?: string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
};

const SerialIcon = ({size, height, width, color, style, className}: SerialIconProps) => {
  const sizeValue: string = typeof size === "number" ? `${size}px` : '';
  return (
    <svg
      viewBox="-4 0 32 32"
      height={sizeValue || height || "24px"}
      width={sizeValue || width || "24px"}
      fill={color || "currentColor"}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 25.281h0.781v-18.563h-0.781v18.563zM2.344 25.281h1.531v-18.563h-1.531v18.563zM5.406 25.281h1.563v-18.563h-1.563v18.563zM8.5 25.281h3.125v-18.563h-3.125v18.563zM13.156 25.281h2.344v-18.563h-2.344v18.563zM17.031 25.281h1.563v-18.563h-1.563v18.563zM20.125 25.281h0.781v-18.563h-0.781v18.563zM22.469 25.281h1.531v-18.563h-1.531v18.563z"
      />
    </svg>
  );
};

export default SerialIcon;