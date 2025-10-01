import { Button } from "@heroui/react";


export interface GenericButtonProps {
  src: string;
  link: string;
  width?: string;
  height?: string;
  color?: string;
  alt?: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const GenericButton = ({ src, link, width, height, color, alt, style, containerStyle }: GenericButtonProps) => {
  const iconClasses = "text-xl text-default-500 dark:text-default-400 pointer-events-none shrink-0";
  const redirectLink = () => {
    window.location.href = link;
  }
  
  return (
    <div className="inline-flex items-center gap-4" style={{ ...containerStyle }}>
      <Button
        isIconOnly
        variant="light"
        size="sm"
        onPress={redirectLink}
      >
        <img
          src={`/assets/${src}.svg`}
          width={width ? width : "20rem"}
          height={height ? height : "20rem"}
          color={color ? color : "#bbb"}
          alt={alt ? alt : "Click here"}
          style={{ fill: color, ...style }}
          className={iconClasses}
        />
      </Button>
    </div>
  );
}

export default GenericButton;