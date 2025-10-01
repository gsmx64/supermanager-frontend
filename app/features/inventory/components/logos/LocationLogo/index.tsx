import LocationIcon from "@/features/inventory/components/icons/LocationIcon";

export interface LocationLogoProps {
  size?: number;
  width?: string;
  height?: string;
  color?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const LocationLogo = ({ size, width, height, color, style, containerStyle }: LocationLogoProps) => {
  const iconClasses = "text-lg text-blue-600 dark:text-blue-200 cursor-pointer active:opacity-50";
  return (
    <div className="flex items-center flex-nowrap" style={{ ...containerStyle }}>
      <LocationIcon
        height={height || "12rem"}
        width={width || "12rem"}
        color={color ? color : "currentColor"}
        className={iconClasses}
        style={{ ...style }}
      />
    </div>
  );
}

export default LocationLogo;