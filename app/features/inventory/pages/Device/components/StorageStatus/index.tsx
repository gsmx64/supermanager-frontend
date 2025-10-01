import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import TitleInfo from "@/features/inventory/pages/Device/components/TitleInfo";


const DiskSpaceChart = ({
  used,
  free,
  total,
}: {
  used: number;
  free: number;
  total: number;
}) => {
  const data = [
    { name: "Usado", value: used },
    { name: "Libre", value: free },
  ];
  const COLORS = ["#6366f1", "#22c55e"];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number, name: string) => [`${value} GB`, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
};

const StorageStatus = () => {
  const { t } = useTranslation();
  const demoDiskSpace = { disk: 512, disk_used: 200, disk_free: 312 };

  return (
    <div className="w-full flex flex-col items-center mb-6">
      <TitleInfo
        title={t('inventory.device-info-storage-current')}
        containerClassName="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-900"
      />
      <DiskSpaceChart
        used={demoDiskSpace?.disk_used ?? 0}
        free={demoDiskSpace?.disk_free ?? 0}
        total={demoDiskSpace?.disk ?? 0}
      />
      <div className="flex justify-between w-full gap-8 text-xs">
        <span className="text-indigo-600 dark:text-indigo-200">
          {t('inventory.disk-used')}: {demoDiskSpace?.disk_used ?? 0} GB
        </span>
        <span className="text-green-600 dark:text-green-200">
          {t('inventory.disk-free')}: {demoDiskSpace?.disk_free ?? 0} GB
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          {t('inventory.disk-total')}: {demoDiskSpace?.disk ?? 0} GB
        </span>
      </div>
    </div>
  );
}

export default StorageStatus;