import type { CounterIconProps } from "@/core/components/icons/CounterIcon/types/CounterIcon.type";


const CounterIcon  = ({size, height, width, color, style, className}: CounterIconProps) => {
  return (
    <svg
      viewBox="0 0 256 256"
      height={size || height || '1em'}
      width={size || width || '1em'}
      fill={color ? color : 'currentColor'}
      style={style}
      className={className ? className : "text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0"}
    >
      <path d="M5,5v246h246V5H5z M237.3,18.7v59.1h-16.6c-1.2-12.8-8-22.6-16.2-22.6c-8.2,0-15,9.8-16.2,22.6h-81.6
        c-1.2-12.8-8-22.6-16.2-22.6s-15,9.8-16.2,22.6h-6.4c-1.2-12.8-8-22.6-16.2-22.6s-15,9.8-16.2,22.6H18.7V18.7H237.3z M220.7,171.1
        c-1.2-12.8-8-22.6-16.2-22.6c-8.2,0-15,9.8-16.2,22.6H182c-1.2-12.8-8-22.6-16.2-22.6c-8.2,0-15,9.8-16.2,22.6h-6.4
        c-1.2-12.8-8-22.6-16.2-22.6s-15,9.8-16.2,22.6H18.7V85.3h17.1c1.1,13,7.9,23.1,16.2,23.1s15.1-10.1,16.2-23.1h6.3
        c1.1,13,7.9,23.1,16.2,23.1s15.1-10.1,16.2-23.1h81.5c1.1,13,7.9,23.1,16.2,23.1c8.3,0,15.1-10.1,16.2-23.1h16.6v85.9H220.7z
        M18.7,237.3v-58.7h92.2c1.1,13,7.9,23.1,16.2,23.1s15.1-10.1,16.2-23.1h6.3c1.1,13,7.9,23.1,16.2,23.1c8.3,0,15.1-10.1,16.2-23.1
        h6.3c1.1,13,7.9,23.1,16.2,23.1c8.3,0,15.1-10.1,16.2-23.1h16.6v58.7H18.7z"
      />
    </svg>
  );
};

export default CounterIcon;