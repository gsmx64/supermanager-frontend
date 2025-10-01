import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table as TableHero,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Divider,
} from "@heroui/react";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import { dateTimeFormat } from "@/core/utils/dateFormat";
import LocationZoneForm from "@/features/inventory/forms/LocationZoneForm";
import CustomSnippet from "@/core/components/ui/CustomSnippet";
import StatusButton from "@/core/components/buttons/StatusButton";
import EditButton from "@/core/components/buttons/EditButton";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import CreatorCard from "@/core/components/cards/CreatorCard";
import ChildCounter from "@/core/components/cards/ChildCounter/ChildCounter";
import LocationIcon from "@/features/inventory/components/icons/LocationIcon";
import ManagerCard from "@/features/inventory/components/cards/ManagerCard";
import type ILocationZone from "@/features/inventory/interfaces/locationZones.interface";
import type { ILocationZoneEdit } from "@/features/inventory/interfaces/locationZones.interface";


type TableDevicesProps = {
  columns: Array<{ title: string; align: string; dataIndex: string; key: string }>;
  data: ILocationZone[];
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
  handleStatus?: (id: number, status: number, title: string) => void;
  handleEdit: (id: number, data: ILocationZone) => void;
  handleDelete: (id: number) => void;
  handleRefresh: (value: boolean) => void;
};

const TableDevices = ({
    columns,
    data,
    style,
    containerStyle,
    currentPage,
    pageCount,
    setCurrentPage,
    handleStatus,
    handleEdit,
    handleDelete,
    handleRefresh
}: TableDevicesProps) => {
  const { t } = useTranslation();
  const authData = useContext(AuthContext);
  const { isAdmin } = authData;

  return (
    <>
      <div
        className="table-container"
        style={{ ...containerStyle }}
      >
        <TableHero
          aria-label="Locations static collection table"
          color="secondary"
          style={{ ...style }}
        >
          <TableHeader>
            {columns.map((column: { title: string; align: string; dataIndex: string; key: string }) => (
              <TableColumn key={column.key} align={column?.align === "center" ? "center" : "start"}>
                {
                  (column.key === 'is_core') ? (
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
                    case "description":
                      break;
                    case "title":
                      (item['description'] === '' || item['description'] === null) ? (
                        cellContent = (
                          <CustomSnippet
                            code={String(item[column.dataIndex])}
                            isTitle={true}
                            color="primary"
                            url={`/inventory/locationzone/${item.id}`}
                          >
                            {item[column.dataIndex]}
                          </CustomSnippet>
                        )
                      ) : (
                        cellContent = (
                          <CustomSnippet
                            code={String(item[column.dataIndex])}
                            isTitle={true}
                            color="primary"
                            description={item.description}
                            url={`/inventory/locationzone/${item.id}`}
                          >
                            {item[column.dataIndex]}
                          </CustomSnippet>
                        )
                      );
                      break;
                    case "code-name":
                      cellContent = (
                        <CustomSnippet
                          code={String(item[column.dataIndex])}
                          isTitle={true}
                          color="primary"
                        >
                          {item[column.dataIndex]}
                        </CustomSnippet>
                      )
                      break;
                    case "address":
                    case "city":
                    case "state":
                    case "zip_code":
                    case "country":
                      cellContent = (
                        <CustomSnippet
                          code={String(item[column.dataIndex])}
                          color="default"
                        >
                          {item[column.dataIndex]}
                        </CustomSnippet>
                      )
                      break;
                    case "manager":
                      cellContent = (
                        <ManagerCard
                          name={item?.manager}
                          email={item?.manager_email}
                        />
                      )
                      break;
                    case "creator":
                      (item?.updater?.id !== undefined && item?.updater?.id !== null) ? (
                        cellContent = (
                          <CreatorCard
                            user={item?.updater}
                            date={t('common.table-updated-at-date', { date: dateTimeFormat(item?.updated_at, t('locale')) })}
                            profileRedirect={true}
                          />
                        )
                      ) : (
                        cellContent = (
                          <CreatorCard
                            user={item?.creator}
                            date={t('common.table-created-at-date', { date: dateTimeFormat(item?.created_at, t('locale')) })}
                            profileRedirect={true}
                          />
                        )
                      )
                      break;
                    case "updater":
                    case "created_at":
                    case "updated_at":
                      break;
                    case "status":
                      cellContent = (
                        <StatusButton
                          id={item.id}
                          title={item.title}
                          status={item[column.dataIndex]}
                          handleStatus={handleStatus != null ? handleStatus : () => {}}
                          handleRefresh={handleRefresh}
                        />
                      );
                      break;
                    case "is_core":
                      cellContent = (
                        <div className="flex items-center flex-nowrap" style={{ ...style }}>
                          <ChildCounter
                            showCounter
                            counter={item.locations_count}
                            CustomIcon={
                              <LocationIcon
                                width="1.0rem"
                                height="1.0rem"
                              />
                            }
                            color={item.devices_count > 0 ? "#0078d4" : "#bbb"}
                            tooltip="Locations: "
                          />
                          <Divider orientation="vertical" className="mx-1" />
                          {(!item.is_core || ( item.is_core && isAdmin)) && (
                            <EditButton<ILocationZoneEdit>
                              title={t('common.edit-modal-title', { title: item.title})}
                              form={LocationZoneForm}
                              formProps={{
                                id: item.id,
                                item,
                                handleEdit,
                                handleRefresh
                              }}
                            />
                          )}  
                          {(!item.is_core || ( item.is_core && isAdmin)) && (
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
        <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
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

export default TableDevices;