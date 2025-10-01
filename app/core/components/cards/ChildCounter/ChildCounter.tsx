import CounterIcon from "@/core/components/icons/CounterIcon";
import { Tooltip } from "@heroui/react";

export interface ChildCounterProps {
  counter: number;
  showCounter?: boolean;
  CustomIcon?: React.ReactNode;
  width?: string;
  height?: string;
  color?: string;
  tooltip?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
};

const Counter = ({ counter, color }: { counter: number, color: string }) => {
  return (
    <div
      className="ml-2 font-bold"
      style={{ color }}
    >
      {counter ? counter : 0}
    </div>
  );
}

const ChildCounter = ({
  counter,
  CustomIcon,
  width,
  height,
  color,
  tooltip,
  style,
  containerClassName,
  containerStyle,
  showCounter=true,
}: ChildCounterProps) => {
  return (
    <div
      className={`inline-flex items-center px-2 py-1 rounded border transition-all duration-200 ${containerClassName}`}
    >
      <Tooltip
        color="default"
        content={tooltip ? `${tooltip} ${counter}` : `Counter: ${counter}`}
        showArrow={true}
      >
        {(CustomIcon) ? (
          <div className="inline-flex items-center flex-nowrap">
            {CustomIcon}
            {showCounter &&
              <Counter
                counter={counter}
                color={color ? color : "currentColor"}
              />
            }
          </div>
        ) : (
          <div className="inline-flex items-center flex-nowrap">
            <CounterIcon
              width={width ? width : "1.0rem"}
              height={height ? height : "1.0rem"}
              color={color ? color : "currentColor"}
              style={{ ...style }}
            />
            {showCounter &&
              <Counter
                counter={counter}
                color={color ? color : "currentColor"}
              />
            }
          </div>
        )}
      </Tooltip>
    </div>
  );
}

export default ChildCounter;