import { useTransition } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "@heroui/react";
import { useTranslation } from "react-i18next";

import DefaultAvatar from "@/core/components/icons/DefaultAvatar";
import { CORE_STORAGE_URL } from "@/core/consts/consts";
import type IUser from "@/core/features/users/interfaces/user.interface";


type CreatorCardProps = {
  user: IUser;
  date: string;
  avatarOnly?: boolean;
  profileRedirect?: boolean;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
};

const CreatorCard = ({
    user,
    date,
    avatarOnly,
    profileRedirect,
    style,
    containerStyle,
    containerClassName
}: CreatorCardProps) => {
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const redirectToUserProfile = (userId: number) => {
    if (profileRedirect) {
      startTransition(() => {
        navigate(`/users/${userId}`);
      });
    }
  };

  return (
    <div className={containerClassName ? containerClassName : "flex gap-4"} style={{...containerStyle}}>
      <div
        className="flex gap-2 items-center"
        style={{...style}}
        onClick={() => redirectToUserProfile(user.id)}
      >
        {
          (user?.avatar && user?.avatar !== null && user?.avatar !== '/media/null') ? (
            <Avatar
              alt={user.username}
              className="shrink-0"
              size="sm"
              src={`${CORE_STORAGE_URL}${user.avatar}`}
              isBordered
            />
          ) : (
            <DefaultAvatar
              className="rounded-full border-2 border-default-500 dark:border-default-600 object-cover shadow"
              color="currentColor"
              width="2rem"
              height="2rem"
            />
          )
        }
        {
          !avatarOnly &&
          (
            <div className="flex flex-col">
              <div className="text-xs min-w-fit max-w-full whitespace-nowrap overflow-x-auto">
                {
                  user.first_name ?
                  user.first_name + " " + user.last_name
                  :
                  user.username
                }
              </div>
              <div
                className="text-xs text-default-400 dark:text-default-500 min-w-fit max-w-full whitespace-nowrap overflow-x-auto"
              >
                {date}
              </div>
            </div>
          )
        }
      </div>
    </div>  
  );
}

export default CreatorCard;