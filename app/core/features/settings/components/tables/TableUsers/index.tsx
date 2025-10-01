import { useTranslation } from "react-i18next";
import { Table as TableHero,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Tooltip
} from "@heroui/react";

import { dateTimeFormat } from "@/core/utils/dateFormat";
import CustomSnippet from "@/core/components/ui/CustomSnippet";
import UserCard from "@/core/components/cards/UserCard";
import ActiveButton from "@/core/components/buttons/ActiveButton";
import EditButton from "@/core/components/buttons/EditButton";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import { CheckIcon } from "@/core/components/icons/CheckIcon";
import { DisabledIcon } from "@/core/components/icons/DisabledIcon";
import type { IUserExtended } from "@/core/features/users/interfaces/user.interface";
import ProfileForm from "@/core/features/users/forms/ProfileForm";
import Counter from "@/core/components/ui/Counter";


type TableUsersProps = {
  columns: Array<{ title: string; align: string; dataIndex: string; key: string }>;
  data: IUserExtended[];
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
  handleActive?: (id: number, is_active: boolean, username: string) => void;
  handleEdit: (id: number, data: any) => void;
  handleDelete: (id: number) => void;
  handleRefresh: (value: boolean) => void;
};

const TableUsers = ({
    columns,
    data,
    style,
    containerStyle,
    currentPage,
    pageCount,
    setCurrentPage,
    handleActive,
    handleEdit,
    handleDelete,
    handleRefresh
}: TableUsersProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="table-container"
        style={{ ...containerStyle }}
      >
        <TableHero
          aria-label="Generic static collection table"
          color="secondary"
          style={{ ...style }}
        >
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.key} align={column?.align === "center" ? "center" : "start"}>
                {
                  (column.key === 'about') ? (
                    t(`common.table-options`)
                  ) : (
                    t(`common.${column.title}`)
                  )
                }
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={t('common.table-no-data')}>
            {data.map((item: any, idx: number) => (
                <TableRow key={idx}>
                {columns.map((column) => {
                  let cellContent;
                  switch (column.key) {
                    case "id":
                      cellContent = idx + 1;
                      break;
                    case "username":
                      cellContent = (
                        <UserCard
                          user={item}
                          profileRedirect={true}
                        />
                      );
                      break;
                    case "first_name":
                    case "last_name":
                      break;
                    case "email":
                      cellContent = (
                        <a href={`mailto:${item[column.dataIndex]}`}>
                          <CustomSnippet
                            code={String(item[column.dataIndex])}
                            color="default"
                          >
                            {item[column.dataIndex]}
                          </CustomSnippet>
                        </a>
                      );
                      break;
                    case "date_joined":
                      cellContent = dateTimeFormat(item[column.dataIndex], t('locale'));
                      break;
                    case "last_login":
                      cellContent = (item[column.dataIndex]) ? dateTimeFormat(item[column.dataIndex], t('locale')) : t('common.never-logged-in');
                      break;
                    case "is_active":
                      cellContent = (
                        <ActiveButton
                          id={item.id}
                          username={item.username}
                          active={item[column.dataIndex]}
                          handleActive={handleActive != null ? handleActive : () => {}}
                          handleRefresh={handleRefresh}
                        />
                      );
                      break;
                    case "is_staff":
                      cellContent = (
                        (item[column.dataIndex]) ? (
                          <Tooltip
                            content={t('common.is-staff')}
                            color="primary"
                            showArrow={true}
                          >  
                            <div>
                              <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content={t('common.no-staff')}
                            color="primary"
                            showArrow={true}
                          >  
                            <div>
                              <DisabledIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                            </div>
                          </Tooltip>
                        )
                      );
                      break;
                    case "is_superuser":
                      cellContent = (
                        (item[column.dataIndex]) ? (
                          <Tooltip
                            content={t('common.is-admin')}
                            color="primary"
                            showArrow={true}
                          >  
                            <div>
                              <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            content={t('common.base-user')}
                            color="primary"
                            showArrow={true}
                          >  
                            <div>
                              <DisabledIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                            </div>
                          </Tooltip>
                        )
                      );
                      break;
                    case "about":
                      cellContent = (
                        <div className="flex items-center flex-nowrap" style={{ ...style }}>
                          <EditButton<IUserExtended>
                            title={t('common.edit-modal-title', { title: item.username})}
                            form={ProfileForm}
                            formProps={{
                              id: item.id,
                              item,
                              handleEdit,
                              handleRefresh
                            }}
                          />
                          {(!item.is_superuser && item.username != 'admin') && (
                            <DeleteButton
                              id={item.id}
                              title={item.title}
                              handleDelete={handleDelete}
                              handleRefresh={handleRefresh}
                            />
                          )}
                        </div>
                      );
                      break;
                    default:
                      cellContent = (
                        <CustomSnippet
                          code={String(item[column.dataIndex])}
                        >
                          {item[column.dataIndex]}
                        </CustomSnippet>
                      );
                  }
                  return (
                  <TableCell key={column.key}>
                    {cellContent}
                  </TableCell>
                  );
                })}
                </TableRow>
            ))}
          </TableBody>
        </TableHero>
        <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
          <Pagination
            isCompact
            showControls
            page={currentPage}
            total={pageCount}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default TableUsers;