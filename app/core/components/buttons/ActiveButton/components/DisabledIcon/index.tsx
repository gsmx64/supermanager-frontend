type DisabledIconProps = {
  size?: number;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
  className?: string;
};

export const DisabledIcon = ({size, height, width, style, className}: DisabledIconProps) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
      stroke="currentColor"
      style={style}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};
