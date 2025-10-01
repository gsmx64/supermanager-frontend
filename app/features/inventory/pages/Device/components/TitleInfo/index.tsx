type TitleInfoProps = {
  title: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

const TitleInfo = ({ title, style, containerClassName, containerStyle }: TitleInfoProps) => {
  return (
    <div
      className={containerClassName ? containerClassName : "col-span-1 md:col-span-2 border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-900"}
      style={{ ...containerStyle }}
    >
      <legend
        className="px-2 text-base font-semibold text-gray-700 dark:text-gray-200"
        style={{ ...style }}
      >
        {title}
      </legend>
    </div>
  );
}

export default TitleInfo;