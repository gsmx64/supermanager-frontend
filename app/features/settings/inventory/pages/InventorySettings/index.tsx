import { useCallback, useContext, useEffect, useState } from "react";
import { Pagination, Tab, Tabs } from "@heroui/react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import { Spinner } from "@/core/components/ui/Spinner";
import { CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import { DeviceTypeColumns } from "@/features/settings/inventory/interfaces/deviceTypes.interface";
import { DeviceMarkColumns } from "@/features/settings/inventory/interfaces/deviceMarks.interface";
import { DeviceModelColumns } from "@/features/settings/inventory/interfaces/deviceModels.interface";
import { DeviceRAMColumns } from "@/features/settings/inventory/interfaces/deviceRAMs.interface";
import { DeviceSystemColumns } from "@/features/settings/inventory/interfaces/deviceSystems.interface";
import { DeviceBuildColumns } from "@/features/settings/inventory/interfaces/deviceBuilds.interface";
import { DeviceProcessorColumns } from "@/features/settings/inventory/interfaces/deviceProcessors.interface";
import { DeviceDiskColumns } from "@/features/settings/inventory/interfaces/deviceDisks.interface";
import useDeviceTypesStore from "@/features/settings/inventory/state/stores/devicesTypes";
import useDeviceMarksStore from "@/features/settings/inventory/state/stores/deviceMarks.store";
import useDeviceModelsStore from "@/features/settings/inventory/state/stores/deviceModels.store";
import useDeviceSystemsStore from "@/features/settings/inventory/state/stores/deviceSystems.store";
import useDeviceBuildsStore from "@/features/settings/inventory/state/stores/deviceBuilds.store";
import useDeviceProcessorsStore from "@/features/settings/inventory/state/stores/deviceProcessors.store";
import useDeviceRAMsStore from "@/features/settings/inventory/state/stores/deviceRAMs.store";
import useDeviceDisksStore from "@/features/settings/inventory/state/stores/deviceDisks.store";
import AccessDenied from "@/core/features/auth/components/AccessDenied";
import SectionTitle from "@/core/components/ui/SectionTitle";
import Table from "@/features/settings/inventory/components/tables/Table";
import SettingsInventoryCard from "@/features/settings/inventory/components/cards/SettingsInventoryCard";
import SectionToolbar from "@/core/components/ui/SectionToolbar";
import CreateButton from "@/core/components/buttons/CreateButton";
import SettingsInventoryForm from "@/features/settings/inventory/forms/SettingsInventoryForm";
import type IDeviceDisk from "@/features/settings/inventory/interfaces/deviceDisks.interface";
import type IDeviceRAM from "@/features/settings/inventory/interfaces/deviceRAMs.interface";
import type IDeviceProcessor from "@/features/settings/inventory/interfaces/deviceProcessors.interface";
import type IDeviceBuild from "@/features/settings/inventory/interfaces/deviceBuilds.interface";
import type IDeviceSystem from "@/features/settings/inventory/interfaces/deviceSystems.interface";
import type IDeviceModel from "@/features/settings/inventory/interfaces/deviceModels.interface";
import type IDeviceMark from "@/features/settings/inventory/interfaces/deviceMarks.interface";
import type IDeviceType from "@/features/settings/inventory/interfaces/deviceTypes.interface";
import type { SettingsInventoryFormTypes } from "@/features/settings/inventory/forms/SettingsInventoryForm";
import type { Route } from ".react-router/types/app/features/settings/inventory/pages/InventorySettings/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('settings.settings-inventory-title') },
    { name: 'description', content: t('settings.settings-inventory-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function InventorySettings() {
  const authData = useContext(AuthContext);
  const { isAdmin, isStaff } = authData;

  const { t } = useTranslation();
  const [swapView, setSwapView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const deviceTypes = useDeviceTypesStore((state) => state.deviceTypes);
  const fetchDeviceTypes = useDeviceTypesStore((state) => state.fetchDeviceTypes);
  const currentPageDeviceTypes = useDeviceTypesStore((state) => state.currentPage);
  const pageCountDeviceTypes = useDeviceTypesStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceTypes = useDeviceTypesStore((state) => state.count);
  const setCurrentPageDeviceTypes = useDeviceTypesStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceTypes = useDeviceTypesStore((state) => state.handleDeprecated);
  const handleStatusDeviceTypes = useDeviceTypesStore((state) => state.handleStatus);
  const handleCreateDeviceTypes = useDeviceTypesStore((state) => state.handleCreate);
  const handleEditDeviceTypes = useDeviceTypesStore((state) => state.handleEdit);
  const handleDeleteDeviceTypes = useDeviceTypesStore((state) => state.handleDelete);

  const deviceMarks = useDeviceMarksStore((state) => state.deviceMarks);
  const fetchDeviceMarks = useDeviceMarksStore((state) => state.fetchDeviceMarks);
  const currentPageDeviceMarks = useDeviceMarksStore((state) => state.currentPage);
  const pageCountDeviceMarks = useDeviceMarksStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceMarks = useDeviceMarksStore((state) => state.count);
  const setCurrentPageDeviceMarks = useDeviceMarksStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceMarks = useDeviceMarksStore((state) => state.handleDeprecated);
  const handleStatusDeviceMarks = useDeviceMarksStore((state) => state.handleStatus);
  const handleCreateDeviceMarks = useDeviceMarksStore((state) => state.handleCreate);
  const handleEditDeviceMarks = useDeviceMarksStore((state) => state.handleEdit);
  const handleDeleteDeviceMarks = useDeviceMarksStore((state) => state.handleDelete);

  const deviceModels = useDeviceModelsStore((state) => state.deviceModels);
  const fetchDeviceModels = useDeviceModelsStore((state) => state.fetchDeviceModels);
  const currentPageDeviceModels = useDeviceModelsStore((state) => state.currentPage);
  const pageCountDeviceModels = useDeviceModelsStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceModels = useDeviceModelsStore((state) => state.count);
  const setCurrentPageDeviceModels = useDeviceModelsStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceModels = useDeviceModelsStore((state) => state.handleDeprecated);
  const handleStatusDeviceModels = useDeviceModelsStore((state) => state.handleStatus);
  const handleCreateDeviceModels = useDeviceModelsStore((state) => state.handleCreate);
  const handleEditDeviceModels = useDeviceModelsStore((state) => state.handleEdit);
  const handleDeleteDeviceModels = useDeviceModelsStore((state) => state.handleDelete);

  const deviceSystems = useDeviceSystemsStore((state) => state.deviceSystems);
  const fetchDeviceSystems = useDeviceSystemsStore((state) => state.fetchDeviceSystems);
  const currentPageDeviceSystems = useDeviceSystemsStore((state) => state.currentPage);
  const pageCountDeviceSystems = useDeviceSystemsStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceSystems = useDeviceSystemsStore((state) => state.count);
  const setCurrentPageDeviceSystems = useDeviceSystemsStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceSystems = useDeviceSystemsStore((state) => state.handleDeprecated);
  const handleStatusDeviceSystems = useDeviceSystemsStore((state) => state.handleStatus);
  const handleCreateDeviceSystems = useDeviceSystemsStore((state) => state.handleCreate);
  const handleEditDeviceSystems = useDeviceSystemsStore((state) => state.handleEdit);
  const handleDeleteDeviceSystems = useDeviceSystemsStore((state) => state.handleDelete);

  const deviceBuilds = useDeviceBuildsStore((state) => state.deviceBuilds);
  const fetchDeviceBuilds = useDeviceBuildsStore((state) => state.fetchDeviceBuilds);
  const currentPageDeviceBuilds = useDeviceBuildsStore((state) => state.currentPage);
  const pageCountDeviceBuilds = useDeviceBuildsStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceBuilds = useDeviceBuildsStore((state) => state.count);
  const setCurrentPageDeviceBuilds = useDeviceBuildsStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceBuilds = useDeviceBuildsStore((state) => state.handleDeprecated);
  const handleStatusDeviceBuilds = useDeviceBuildsStore((state) => state.handleStatus);
  const handleCreateDeviceBuilds = useDeviceBuildsStore((state) => state.handleCreate);
  const handleEditDeviceBuilds = useDeviceBuildsStore((state) => state.handleEdit);
  const handleDeleteDeviceBuilds = useDeviceBuildsStore((state) => state.handleDelete);

  const deviceProcessors = useDeviceProcessorsStore((state) => state.deviceProcessors);
  const fetchDeviceProcessors = useDeviceProcessorsStore((state) => state.fetchDeviceProcessors);
  const currentPageDeviceProcessors = useDeviceProcessorsStore((state) => state.currentPage);
  const pageCountDeviceProcessors = useDeviceProcessorsStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceProcessors = useDeviceProcessorsStore((state) => state.count);
  const setCurrentPageDeviceProcessors = useDeviceProcessorsStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceProcessors = useDeviceProcessorsStore((state) => state.handleDeprecated);
  const handleStatusDeviceProcessors = useDeviceProcessorsStore((state) => state.handleStatus);
  const handleCreateDeviceProcessors = useDeviceProcessorsStore((state) => state.handleCreate);
  const handleEditDeviceProcessors = useDeviceProcessorsStore((state) => state.handleEdit);
  const handleDeleteDeviceProcessors = useDeviceProcessorsStore((state) => state.handleDelete);

  const deviceRAMs = useDeviceRAMsStore((state) => state.deviceRAMs);
  const fetchDeviceRAMs = useDeviceRAMsStore((state) => state.fetchDeviceRAMs);
  const currentPageDeviceRAMs = useDeviceRAMsStore((state) => state.currentPage);
  const pageCountDeviceRAMs = useDeviceRAMsStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceRAMs = useDeviceRAMsStore((state) => state.count);
  const setCurrentPageDeviceRAMs = useDeviceRAMsStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceRAMs = useDeviceRAMsStore((state) => state.handleDeprecated);
  const handleStatusDeviceRAMs = useDeviceRAMsStore((state) => state.handleStatus);
  const handleCreateDeviceRAMs = useDeviceRAMsStore((state) => state.handleCreate);
  const handleEditDeviceRAMs = useDeviceRAMsStore((state) => state.handleEdit);
  const handleDeleteDeviceRAMs = useDeviceRAMsStore((state) => state.handleDelete);

  const deviceDisks = useDeviceDisksStore((state) => state.deviceDisks);
  const fetchDeviceDisks = useDeviceDisksStore((state) => state.fetchDeviceDisks);
  const currentPageDeviceDisks = useDeviceDisksStore((state) => state.currentPage);
  const pageCountDeviceDisks = useDeviceDisksStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const countDeviceDisks = useDeviceDisksStore((state) => state.count);
  const setCurrentPageDeviceDisks = useDeviceDisksStore((state) => state.setCurrentPage);
  const handleDeprecatedDeviceDisks = useDeviceDisksStore((state) => state.handleDeprecated);
  const handleStatusDeviceDisks = useDeviceDisksStore((state) => state.handleStatus);
  const handleCreateDeviceDisks = useDeviceDisksStore((state) => state.handleCreate);
  const handleEditDeviceDisks = useDeviceDisksStore((state) => state.handleEdit);
  const handleDeleteDeviceDisks = useDeviceDisksStore((state) => state.handleDelete);

  useEffect(() => {
    fetchDeviceTypes(currentPageDeviceTypes, CORE_DEFAULT_PAGE_SIZE, 'title');
    fetchDeviceMarks(currentPageDeviceMarks, CORE_DEFAULT_PAGE_SIZE, 'title');
    fetchDeviceModels(currentPageDeviceModels, CORE_DEFAULT_PAGE_SIZE, 'title');
    fetchDeviceSystems(currentPageDeviceSystems, CORE_DEFAULT_PAGE_SIZE, 'title');
    fetchDeviceBuilds(currentPageDeviceBuilds, CORE_DEFAULT_PAGE_SIZE, 'title');
    fetchDeviceProcessors(currentPageDeviceProcessors, CORE_DEFAULT_PAGE_SIZE, 'title');
    fetchDeviceRAMs(currentPageDeviceRAMs, CORE_DEFAULT_PAGE_SIZE, 'title');
    fetchDeviceDisks(currentPageDeviceDisks, CORE_DEFAULT_PAGE_SIZE, 'title');
  }, [
    isRefreshing,
    currentPageDeviceTypes,
    currentPageDeviceMarks,
    currentPageDeviceModels,
    currentPageDeviceSystems,
    currentPageDeviceBuilds,
    currentPageDeviceProcessors,
    currentPageDeviceRAMs,
    currentPageDeviceDisks
  ]);

  return (
    (isAdmin || isStaff) ?
    (
      <>
        <SectionTitle
          title={t('settings.settings-inventory-title')}
          description={t('settings.settings-inventory-description')}
        />
        <Tabs
          key={"settings-inventory-title"}
          aria-label="Inventory Options"
          variant="bordered"
          isVertical={false}
        >

          <Tab
            key="device-types"
            title={t('settings.device-types')}
          >
            <SectionToolbar
              count={countDeviceTypes}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceType,
                  handleCreate: handleCreateDeviceTypes as (item: IDeviceType) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceType>
                columns={DeviceTypeColumns}
                data={deviceTypes}
                currentPage={currentPageDeviceTypes}
                pageCount={pageCountDeviceTypes}
                setCurrentPage={setCurrentPageDeviceTypes}
                handleDeprecated={handleDeprecatedDeviceTypes}
                handleStatus={handleStatusDeviceTypes}
                handleEdit={handleEditDeviceTypes as (id: number, data: IDeviceType) => void}
                handleDelete={handleDeleteDeviceTypes}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceTypes.map((item: IDeviceType, idx: number) => (
                    <SettingsInventoryCard<IDeviceType>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceTypes}
                      handleStatus={handleStatusDeviceTypes}
                      handleEdit={handleEditDeviceTypes as (id: number, data: IDeviceType) => void}
                      handleDelete={handleDeleteDeviceTypes}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceTypes}
                    total={pageCountDeviceTypes}
                    onChange={(page) => {
                      setCurrentPageDeviceTypes(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="device-marks"
            title={t('settings.device-marks')}
          >
            <SectionToolbar
              count={countDeviceMarks}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceMark,
                  handleCreate: handleCreateDeviceMarks as (item: IDeviceMark) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceMark>
                columns={DeviceMarkColumns}
                data={deviceMarks}
                currentPage={currentPageDeviceMarks}
                pageCount={pageCountDeviceMarks}
                setCurrentPage={setCurrentPageDeviceMarks}
                handleDeprecated={handleDeprecatedDeviceMarks}
                handleStatus={handleStatusDeviceMarks}
                handleEdit={handleEditDeviceMarks as (id: number, data: IDeviceMark) => void}
                handleDelete={handleDeleteDeviceMarks}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceMarks.map((item: IDeviceMark, idx: number) => (
                    <SettingsInventoryCard<IDeviceMark>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceMarks}
                      handleStatus={handleStatusDeviceMarks}
                      handleEdit={handleEditDeviceMarks as (id: number, data: IDeviceMark) => void}
                      handleDelete={handleDeleteDeviceMarks}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceMarks}
                    total={pageCountDeviceMarks}
                    onChange={(page) => {
                      setCurrentPageDeviceMarks(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="device-models"
            title={t('settings.device-models')}
          >
            <SectionToolbar
              count={countDeviceModels}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceModel,
                  handleCreate: handleCreateDeviceModels as (item: IDeviceModel) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceModel>
                columns={DeviceModelColumns}
                data={deviceModels}
                currentPage={currentPageDeviceModels}
                pageCount={pageCountDeviceModels}
                setCurrentPage={setCurrentPageDeviceModels}
                handleDeprecated={handleDeprecatedDeviceModels}
                handleStatus={handleStatusDeviceModels}
                handleEdit={handleEditDeviceModels as (id: number, data: IDeviceModel) => void}
                handleDelete={handleDeleteDeviceModels}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceModels.map((item: IDeviceModel, idx: number) => (
                    <SettingsInventoryCard<IDeviceModel>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceModels}
                      handleStatus={handleStatusDeviceModels}
                      handleEdit={handleEditDeviceModels as (id: number, data: IDeviceModel) => void}
                      handleDelete={handleDeleteDeviceModels}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceModels}
                    total={pageCountDeviceModels}
                    onChange={(page) => {
                      setCurrentPageDeviceModels(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="device-systems"
            title={t('settings.device-systems')}
          >
            <SectionToolbar
              count={countDeviceSystems}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceSystem,
                  handleCreate: handleCreateDeviceSystems as (item: IDeviceSystem) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceSystem>
                columns={DeviceSystemColumns}
                data={deviceSystems}
                currentPage={currentPageDeviceSystems}
                pageCount={pageCountDeviceSystems}
                setCurrentPage={setCurrentPageDeviceSystems}
                handleDeprecated={handleDeprecatedDeviceSystems}
                handleStatus={handleStatusDeviceSystems}
                handleEdit={handleEditDeviceSystems as (id: number, data: IDeviceSystem) => void}
                handleDelete={handleDeleteDeviceSystems}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceSystems.map((item: IDeviceSystem, idx: number) => (
                    <SettingsInventoryCard<IDeviceSystem>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceSystems}
                      handleStatus={handleStatusDeviceSystems}
                      handleEdit={handleEditDeviceSystems as (id: number, data: IDeviceSystem) => void}
                      handleDelete={handleDeleteDeviceSystems}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceSystems}
                    total={pageCountDeviceSystems}
                    onChange={(page) => {
                      setCurrentPageDeviceSystems(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="device-builds"
            title={t('settings.device-builds')}
          >
            <SectionToolbar
              count={countDeviceBuilds}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceBuild,
                  handleCreate: handleCreateDeviceBuilds as (item: IDeviceBuild) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceBuild>
                columns={DeviceBuildColumns}
                data={deviceBuilds}
                currentPage={currentPageDeviceBuilds}
                pageCount={pageCountDeviceBuilds}
                setCurrentPage={setCurrentPageDeviceBuilds}
                handleDeprecated={handleDeprecatedDeviceBuilds}
                handleStatus={handleStatusDeviceBuilds}
                handleEdit={handleEditDeviceBuilds as (id: number, data: IDeviceBuild) => void}
                handleDelete={handleDeleteDeviceBuilds}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceBuilds.map((item: IDeviceBuild, idx: number) => (
                    <SettingsInventoryCard<IDeviceBuild>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceBuilds}
                      handleStatus={handleStatusDeviceBuilds}
                      handleEdit={handleEditDeviceBuilds as (id: number, data: IDeviceBuild) => void}
                      handleDelete={handleDeleteDeviceBuilds}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceBuilds}
                    total={pageCountDeviceBuilds}
                    onChange={(page) => {
                      setCurrentPageDeviceBuilds(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="device-processors"
            title={t('settings.device-processors')}
          >
            <SectionToolbar
              count={countDeviceProcessors}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceProcessor,
                  handleCreate: handleCreateDeviceProcessors as (item: IDeviceProcessor) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceProcessor>
                columns={DeviceProcessorColumns}
                data={deviceProcessors}
                currentPage={currentPageDeviceProcessors}
                pageCount={pageCountDeviceProcessors}
                setCurrentPage={setCurrentPageDeviceProcessors}
                handleDeprecated={handleDeprecatedDeviceProcessors}
                handleStatus={handleStatusDeviceProcessors}
                handleEdit={handleEditDeviceProcessors as (id: number, data: IDeviceProcessor) => void}
                handleDelete={handleDeleteDeviceProcessors}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceProcessors.map((item: IDeviceProcessor, idx: number) => (
                    <SettingsInventoryCard<IDeviceProcessor>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceProcessors}
                      handleStatus={handleStatusDeviceProcessors}
                      handleEdit={handleEditDeviceProcessors as (id: number, data: IDeviceProcessor) => void}
                      handleDelete={handleDeleteDeviceProcessors}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceProcessors}
                    total={pageCountDeviceProcessors}
                    onChange={(page) => {
                      setCurrentPageDeviceProcessors(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="device-rams"
            title={t('settings.device-rams')}
          >
            <SectionToolbar
              count={countDeviceRAMs}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceRAM,
                  handleCreate: handleCreateDeviceRAMs as (item: IDeviceRAM) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceRAM>
                columns={DeviceRAMColumns}
                data={deviceRAMs}
                currentPage={currentPageDeviceRAMs}
                pageCount={pageCountDeviceRAMs}
                setCurrentPage={setCurrentPageDeviceRAMs}
                handleDeprecated={handleDeprecatedDeviceRAMs}
                handleStatus={handleStatusDeviceRAMs}
                handleEdit={handleEditDeviceRAMs as (id: number, data: IDeviceRAM) => void}
                handleDelete={handleDeleteDeviceRAMs}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceRAMs.map((item: IDeviceRAM, idx: number) => (
                    <SettingsInventoryCard<IDeviceRAM>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceRAMs}
                      handleStatus={handleStatusDeviceRAMs}
                      handleEdit={handleEditDeviceRAMs as (id: number, data: IDeviceRAM) => void}
                      handleDelete={handleDeleteDeviceRAMs}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceRAMs}
                    total={pageCountDeviceRAMs}
                    onChange={(page) => {
                      setCurrentPageDeviceRAMs(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

          <Tab
            key="device-disks"
            title={t('settings.device-disks')}
          >
            <SectionToolbar
              count={countDeviceDisks}
              swapView={swapView}
              setSwapView={setSwapView}
              CreateButton={CreateButton<SettingsInventoryFormTypes>}
              CreateButtonProps={{
                title: t('inventory.new-items'),
                form: SettingsInventoryForm,
                formProps: {
                  item: {} as IDeviceDisk,
                  handleCreate: handleCreateDeviceDisks as (item: IDeviceDisk) => void,
                  handleRefresh
                }
              }}
            />

            {(swapView) ?
            (
              <Table<IDeviceDisk>
                columns={DeviceDiskColumns}
                data={deviceDisks}
                currentPage={currentPageDeviceDisks}
                pageCount={pageCountDeviceDisks}
                setCurrentPage={setCurrentPageDeviceDisks}
                handleDeprecated={handleDeprecatedDeviceDisks}
                handleStatus={handleStatusDeviceDisks}
                handleEdit={handleEditDeviceDisks as (id: number, data: IDeviceDisk) => void}
                handleDelete={handleDeleteDeviceDisks}
                handleRefresh={handleRefresh}
              />
            ) : (
              <>
                <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
                  {(deviceDisks.map((item: IDeviceDisk, idx: number) => (
                    <SettingsInventoryCard<IDeviceDisk>
                      key={idx}
                      item={item}
                      handleDeprecated={handleDeprecatedDeviceDisks}
                      handleStatus={handleStatusDeviceDisks}
                      handleEdit={handleEditDeviceDisks as (id: number, data: IDeviceDisk) => void}
                      handleDelete={handleDeleteDeviceDisks}
                      handleRefresh={handleRefresh}
                    />
                  )))}
                </div>
                <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
                  <Pagination
                    isCompact
                    showControls
                    page={currentPageDeviceDisks}
                    total={pageCountDeviceDisks}
                    onChange={(page) => {
                      setCurrentPageDeviceDisks(page);
                    }}
                  />
                </div>
              </>
            )}
          </Tab>

        </Tabs>
      </>
    ) : (
      <AccessDenied />
    )
  );
}