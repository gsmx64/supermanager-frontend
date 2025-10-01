import { Avatar } from "@heroui/react";


type ManagerCardProps = {
  name: string;
  email: string;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
};

const ManagerCard = ({
    name,
    email,
    style,
    containerStyle
}: ManagerCardProps) => {

  return (
    <div className="flex gap-4" style={{...containerStyle}}>
      <div
        className="flex gap-2 items-center"
        style={{...style}}
      >
        <Avatar name={name} />
        {(
          <div className="flex flex-col">
            <div className="text-xs min-w-fit max-w-full whitespace-nowrap overflow-x-auto">
              {name}
            </div>
            <div
              className="text-xs text-default-400 dark:text-default-500 min-w-fit max-w-full whitespace-nowrap overflow-x-auto"
            >
              {email}
            </div>
          </div>
        )}
      </div>
    </div>  
  );
}

export default ManagerCard;