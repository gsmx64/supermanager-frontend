import type { ProfileIconProps } from "@/core/components/icons/ProfileIcon/types/ProfileIcon.type";


const ProfileIcon  = ({size, height, width, color, style, className}: ProfileIconProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      height={size || height || '1em'}
      width={size || width || '1em'}
      fill={color ? color : 'currentColor'}
      focusable="false"
      aria-hidden="true"
      role="presentation"
      style={style}
      className={className ? className : "text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none shrink-0"}
    >
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          transform="translate(-140.000000, -2079.000000)"
          fill={color ? color : 'currentColor'}
        >
          <g
            transform="translate(56.000000, 160.000000)"
          >
            <path
              d="M102,1933 L101.734,1933 C101.124,1930.495 99.342,1928.454 96.995,1927.495 C97.594,1926.796 97.969,1925.899 97.969,1924.906 C97.969,1922.988 96.617,1921.389 94.815,1921 L102,1921 L102,1933 Z M102,1937 L86,1937 L86,1935 L101.963,1935 L102,1935 L102,1937 Z M86,1921 L93.122,1921 C91.32,1921.389 89.969,1922.988 89.969,1924.906 C89.969,1925.899 90.344,1926.796 90.943,1927.495 C88.594,1928.454 86.812,1930.495 86.203,1933 L86,1933 L86,1921 Z M99.659,1933 L88.28,1933 C89.071,1930.632 91.299,1928.92 93.926,1928.902 C93.941,1928.902 93.954,1928.906 93.969,1928.906 C93.983,1928.906 93.997,1928.902 94.011,1928.902 C96.64,1928.92 98.868,1930.632 99.659,1933 L99.659,1933 Z M94.011,1926.902 C93.997,1926.902 93.983,1926.9 93.969,1926.9 C93.954,1926.9 93.941,1926.902 93.926,1926.902 C92.844,1926.879 91.969,1925.995 91.969,1924.906 C91.969,1923.803 92.866,1922.906 93.969,1922.906 C95.072,1922.906 95.969,1923.803 95.969,1924.906 C95.969,1925.995 95.094,1926.879 94.011,1926.902 L94.011,1926.902 Z M84,1939 L104,1939 L104,1919 L84,1919 L84,1939 Z"
            />
        </g>
      </g>
    </g>
    </svg>
  );
};

export default ProfileIcon;