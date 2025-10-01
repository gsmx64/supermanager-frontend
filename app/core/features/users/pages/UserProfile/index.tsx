import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useUsersStore from "@/core/features/users/state/stores/users.store";
import SectionTitle from "@/core/components/ui/SectionTitle";
import ProfileForm from "@/core/features/users/forms/ProfileForm";
import { ProfileCard } from "@/core/features/users/components/cards/ProfileCard";
import type { Route } from ".react-router/types/app/core/layouts/default/+types";
import { NotFound } from "@/core/layouts/default/components/NotFound";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('profile.title') },
    { name: t('profile.meta-name'), content: t('profile.meta-content') },
  ];
}


export default function UserProfile({
  params,
}: Route.ComponentProps) {
  const { t } = useTranslation();
  const user = useUsersStore((state) => state.user);
  const fetchUser = useUsersStore((state) => state.fetchUser);
  const handleEdit = useUsersStore((state) => state.handleEdit);
  const profileEdit = useUsersStore((state) => state.profileEdit);
  const setProfileEdit = useUsersStore((state) => state.setProfileEdit);

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchUser(Number(params.userId));
  }, [isRefreshing, profileEdit]);

  return (
    <>
      {(user.id) ?
      (
        <>
          <SectionTitle
            title={t('profile.users-title', { userName: user.username })}
            description={t('profile.users-description', { firstname: user.first_name, lastname: user.last_name })}
          />
          {(profileEdit) ? 
          (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileForm
                item={user}
                setProfileEdit={setProfileEdit}
                handleEdit={handleEdit}
                handleRefresh={handleRefresh}
              />
            </div>
          ) : (
            <div>
              <ProfileCard
                user={user}
                setProfileEdit={setProfileEdit}
                handleRefresh={handleRefresh}
              />
            </div>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}
