type esESFlagProps = {
  size?: number;
  height?: number;
  width?: number;
  style?: React.CSSProperties;
  className?: string;
};

const esESFlag = ({size, height, width, style, className}: esESFlagProps) => {
  return (
    <svg
      viewBox="0 0 512 512"
      height={size || height || 16}
      width={size || width || 16}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="circleFlagsEsVariant0">
        <circle cx="256" cy="256" r="256" fill="#fff"/>
      </mask>
      <g mask="url(#circleFlagsEsVariant0)">
        <path fill="#d80027" d="M0 0h512v128l-39.8 130.3L512 384v128H0V384l37.8-124L0 128z"/>
        <path fill="#ffda44" d="M0 128h512v256H0z"/>
      </g>
    </svg>
  );
};

export default esESFlag;