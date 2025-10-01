import { useContext, useTransition } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  Button,
  useDisclosure,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as HeroUIDropdown
} from "@heroui/react";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import UserCard from "@/core/components/cards/UserCard";
import useUsersStore from "@/core/features/users/state/stores/users.store";
import ChangePassword from "@/core/features/users/components/modals/ChangePassword";
import type IUser from "@/core/features/users/interfaces/user.interface";
import LogoutIcon from "@/core/components/icons/LogoutIcon";
import PasswordIcon from "@/core/components/icons/PasswordIcon";
import SettingsIcon from "@/core/components/icons/SettingsIcon";
import ProfileIcon from "@/core/components/icons/ProfileIcon";


const ProfileOptions = () => {
  const { t } = useTranslation();
  const menuClasses = "flex flex-row items-center gap-2 text-gray-500 dark:text-gray-300";

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const handleRedirectTo = (link: string) => {
    startTransition(() => {
      navigate(`${link}`);
    });
  };

  const authData = useContext(AuthContext);
  const { userData } = authData;
  const user = userData as IUser;
  const handleChangeOwnPassword = useUsersStore((state) => state.handleChangeOwnPassword);

  return (
    <>
      <HeroUIDropdown aria-label="Open User Menu">
        <DropdownTrigger>
          <Button variant="light" isIconOnly>
            <UserCard
              user={user}
              avatarOnly={true}
              profileRedirect={false}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Menu Options" variant="faded" disabledKeys={["signed-in-as"]}>
          <DropdownItem
            key="signed-in-as"
            showDivider
            textValue="signed-in-as"
            className="h-14 flex flex-col gap-2"
          >
            <p
              className={`${menuClasses} font-semibold`}
            >
              {t('users.welcome-user', { userFirstName: user.first_name ? user.first_name : user.username })}
            </p>
            <p
              className={`${menuClasses} font-semibold`}
            >
              {t('users.signed-in-as', { username: user.username })}
            </p>
          </DropdownItem>
          <DropdownItem
            key="profile"
            textValue="profile"
            startContent={<ProfileIcon />}
            onPress={() => handleRedirectTo('/profile')}
            className={menuClasses}
          >
            {t('users.my-profile')}
          </DropdownItem>
          <DropdownItem
            key="settings"
            textValue="settings"
            startContent={<SettingsIcon />}
            onPress={() => handleRedirectTo('/settings/user')}
            className={menuClasses}
          >
            {t('users.my-settings')}
          </DropdownItem>
          <DropdownItem
            key="change-password"
            showDivider
            textValue="change-password"
            startContent={<PasswordIcon />}
            onPress={onOpen}
            className={menuClasses}
          >
            {t('users.change-password')}
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            textValue="logout"
            startContent={<LogoutIcon />}
            onPress={() => handleRedirectTo('/auth/logout')}
            className={menuClasses}
          >
            {t('users.logout')}
          </DropdownItem>
        </DropdownMenu>
      </HeroUIDropdown>
      <ChangePassword
        userId={user.id}
        userName={user.username}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleChangePassword={handleChangeOwnPassword}
      />
    </>
  );
};

export default ProfileOptions;