import { useTransition } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "@heroui/react";

import DefaultAvatar from "@/core/components/icons/DefaultAvatar";
import { CORE_STORAGE_URL } from "@/core/consts/consts";
import { useTheme } from "@/core/hooks/useTheme";
import type IUser from "@/core/features/users/interfaces/user.interface";


type UserCardProps = {
  user: IUser;
  avatarOnly?: boolean;
  profileRedirect?: boolean;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
};

const UserCard = ({
    user,
    avatarOnly,
    profileRedirect,
    style,
    containerStyle
}: UserCardProps) => {
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();

  const navigate = useNavigate();
  const redirectToUserProfile = (userId: number) => {
    if (profileRedirect) {
      startTransition(() => {
        navigate(`/users/${userId}`);
      });
    }
  };

  return (
    <div className="flex gap-4" style={{...containerStyle}}>
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
              <span className="text-small">
                {
                  user.first_name ?
                  user.first_name + " " + user.last_name
                  :
                  user.username
                }
              </span>
              <span
                className="text-tiny text-default-400 dark:text-default-500"
              >
                {user.email}
              </span>
            </div>
          )
        }
      </div>
    </div>  
  );
}

export default UserCard;