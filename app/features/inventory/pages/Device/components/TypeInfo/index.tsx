type TypeInfoProps = {
  title?: string;
  item: string | number | null | undefined;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

const TypeInfo = ({ title, item, style, containerClassName, containerStyle }: TypeInfoProps) => {
  return (
    (item) &&
    (
      <div
        className={containerClassName ? containerClassName : "flex flex-col gap-0.5 mb-2"}
        style={{ ...containerStyle }}
      >
        {(title) && (
          <div
            className="text-small text-gray-400 dark:text-gray-600"
            style={{ ...style }}
          >
            {title}
          </div>
        )}
        <div
          className="text-small text-gray-800 dark:text-gray-300"
          style={{ ...style }}
        >
          {item}
        </div>
      </div>
    )
  );
}

export default TypeInfo;