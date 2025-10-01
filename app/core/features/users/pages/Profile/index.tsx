import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useUsersStore from "@/core/features/users/state/stores/users.store";
import SectionTitle from "@/core/components/ui/SectionTitle";
import ProfileForm from "@/core/features/users/forms/ProfileForm";
import { ProfileCard } from "@/core/features/users/components/cards/ProfileCard";
import type { Route } from ".react-router/types/app/core/layouts/default/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('profile.title') },
    { name: t('profile.meta-name'), content: t('profile.meta-content') },
  ];
}


export default function Profile() {
  const { t } = useTranslation();
  const user = useUsersStore((state) => state.user);
  const fetchProfile = useUsersStore((state) => state.fetchProfile);
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
    fetchProfile();
  }, [isRefreshing, profileEdit]);

  return (
    <>
      <SectionTitle
        title={t('profile.title')}
        description={t('profile.description')}
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
  );
}
