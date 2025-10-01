import DeviceIcon from "@/features/inventory/components/icons/DeviceIcon";

export interface DeviceLogoProps {
  width?: string;
  height?: string;
  color?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const DeviceLogo = ({ width, height, color, style, containerStyle }: DeviceLogoProps) => {
  const iconClasses = "text-lg text-blue-600 dark:text-blue-600 cursor-pointer active:opacity-50";
  return (
    <>
      <div className={`flex items-center flex-nowrap ${iconClasses}`} style={{ ...containerStyle }}>
        <DeviceIcon
          height={height || "8rem"}
          width={width || "8rem"}
          color={color ? color : "currentColor"}
          className={iconClasses}
          style={{ ...style }}
        />
      </div>
    </>
  );
}

export default DeviceLogo;