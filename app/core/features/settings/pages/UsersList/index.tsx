import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import { UserColumns } from "@/core/features/users/interfaces/user.interface";
import { Spinner } from "@/core/components/ui/Spinner";
import useUsersStore from "@/core/features/users/state/stores/users.store";
import TableUsers from "@/core/features/settings/components/tables/TableUsers";
import SectionTitle from "@/core/components/ui/SectionTitle";
import AccessDenied from "@/core/features/auth/components/AccessDenied";
import UsersCard from "@/core/features/settings/components/cards/UsersCard";
import SectionToolbar from "@/core/components/ui/SectionToolbar";
import type { Route } from ".react-router/types/app/core/features/settings/pages/UsersList/+types";
import type IUser from "@/core/features/users/interfaces/user.interface";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('settings.settings-users-title') },
    { name: 'description', content: t('settings.settings-users-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function UsersList() {
  const authData = useContext(AuthContext);
  const { isAdmin } = authData;

  const { t } = useTranslation();
  const [swapView, setSwapView] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const users = useUsersStore((state) => state.users);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);
  const currentPage = useUsersStore((state) => state.currentPage);
  const itemsPerPage = useUsersStore((state) => state.itemsPerPage);
  const itemsOrdering = useUsersStore((state) => state.itemsOrdering);
  const pageCount = useUsersStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const count = useUsersStore((state) => state.count);
  const setCurrentPage = useUsersStore((state) => state.setCurrentPage);
  const handleActive = useUsersStore((state) => state.handleActive);
  const handleEdit = useUsersStore((state) => state.handleEdit);
  const handleDelete = useUsersStore((state) => state.handleDelete);

  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, itemsOrdering);
  }, [
    isRefreshing,
    currentPage,
    handleRefresh
  ]);

  return (
    (isAdmin) ?
    (
      <>
        <SectionTitle
          title={t('settings.settings-users-title')}
          description={t('settings.settings-users-description')}
        />

        <SectionToolbar
          count={count}
          swapView={swapView}
          setSwapView={setSwapView}
        />

        {(swapView) ?
        (
          <TableUsers
            columns={UserColumns}
            data={users}
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
            handleActive={handleActive}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleRefresh={handleRefresh}
          />
         ) : (
            <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
              {(users.map((item: IUser, idx: number) => (
                <UsersCard
                  key={idx}
                  item={item as IUser}
                  handleActive={handleActive}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleRefresh={handleRefresh}
                />
              )))}
            </div>
          )}
      </>
    ) : (
      <AccessDenied />
    )
  );
}