import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Table as TableHero,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from "@heroui/react";

import { dateTimeFormat } from "@/core/utils/dateFormat";
import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import DeviceForm from "@/features/inventory/forms/DeviceForm";
import CustomSnippet from "@/core/components/ui/CustomSnippet";
import StatusButton from "@/core/components/buttons/StatusButton";
import EditButton from "@/core/components/buttons/EditButton";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import CreatorCard from "@/core/components/cards/CreatorCard";
import NetworkConectivity from "@/core/components/buttons/NetworkConectivity";
import ActionButton from "@/core/components/buttons/ActionButton";
import type IDevice from "@/features/inventory/interfaces/devices.interface";
import type { IDeviceEdit } from "@/features/inventory/interfaces/devices.interface";


type TableDevicesProps = {
  columns: Array<{ title: string; align: string; dataIndex: string; key: string }>;
  data: IDevice[];
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
  handleStatus?: (id: number, status: number, title: string) => void;
  handleEdit: (id: number, data: IDevice) => void;
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
          aria-label="Devices static collection table"
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
                    t(`inventory.${column.title}`)
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
                    case "notes":
                      break;
                    case "internal_id":
                    case "hostname":
                      (item['notes'] === '' || item['notes'] === null) ? (
                        cellContent = (
                          <CustomSnippet
                            code={String(item[column.dataIndex])}
                            isTitle={true}
                            color="primary"
                            url={`/inventory/device/${item.id}`}
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
                            url={`/inventory/device/${item.id}`}
                          >
                            {item[column.dataIndex]}
                          </CustomSnippet>
                        )
                      );
                      break;
                    case "type":
                    case "mark":
                    case "model":
                    case "system":
                    case "build":
                    case "processor":
                    case "ram":
                    case "disk":
                      cellContent = (
                        <CustomSnippet
                          code={String(item[column.dataIndex])}
                          color="default"
                        >
                          {item[column.dataIndex].title}
                        </CustomSnippet>
                      )
                      break;  
                   
                    case "network_ipv4":
                    case "network_mac":
                    case "remote_id":
                    case "serial":
                    case "user_owner":
                      cellContent = (
                        <CustomSnippet
                          code={String(item[column.dataIndex])}
                          color="default"
                        >
                          {item[column.dataIndex]}
                        </CustomSnippet>
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
                          <NetworkConectivity
                            ipv4={item.network_ipv4}
                            ipv6={item.network_ipv6 ? item.network_ipv6 : ''}
                          />
                          <ActionButton
                            id={item.id}
                            color={"#0078d4"}
                          />
                          {(!item.is_core || ( item.is_core && isAdmin)) && (
                            <EditButton<IDeviceEdit>
                              title={t('common.edit-modal-title', { title: item.hostname})}
                              form={DeviceForm}
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