export interface UnderDevelopmentProps {
  title: string;
  description: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const UnderDevelopment = ({ title, description, style, containerStyle, type='info' }: UnderDevelopmentProps) => {
  let colorClassName = '';
  switch (type) {
  case 'error':
    colorClassName = 'text-red-700 dark:text-red-500';
    break;
  case 'warning':
    colorClassName = 'text-yellow-700 dark:text-yellow-300';
    break;
  case 'info':
    colorClassName = 'text-blue-700 dark:text-blue-100';
    break;
  case 'success':
    colorClassName = 'text-green-700 dark:text-green-300';
    break;
  }

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full h-full rounded-lg shadow-md p-4"
        style={{ ...containerStyle }}
      >
        <div
          className="flex flex-col items-center justify-center w-full"
          style={{ ...style }}
        >
          <h2
        className={`text-lg font-bold mb-2 ${colorClassName}`}
        style={{ ...style }}
          >
        {title}
          </h2>
          <div
        className="w-full flex items-center justify-center"
        style={{ ...style }}
          >
        <span
          className={`text-base ${colorClassName}`}
          style={{ ...style }}
        >
          {description}
        </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnderDevelopment;