import { useTranslation } from "react-i18next";

import TitleInfo from "@/features/inventory/pages/Device/components/TitleInfo";


const SoftwareStatus = () => {
  const { t } = useTranslation();
  const demoInstalledSoftware = [
    { id: 1, title: "Google Chrome", version: "124.0.6367.91", date: "2024-05-10", status: "up-to-date" },
    { id: 2, title: "Microsoft Edge", version: "124.0.2478.80", date: "2024-05-09", status: "up-to-date" },
    { id: 3, title: "Mozilla Firefox", version: "126.0", date: "2024-05-08", status: "down-to-date" },
    { id: 4, title: "Adobe Acrobat Reader", version: "2024.002.20759", date: "2024-05-07", status: "up-to-date" },
    { id: 5, title: "WinRAR", version: "6.24", date: "2024-05-06", status: "down-to-date" },
    { id: 6, title: "VLC Media Player", version: "3.0.20", date: "2024-05-05", status: "down-to-date" },
    { id: 7, title: "Microsoft Office 2021", version: "16.0.14332.20345", date: "2024-05-04", status: "up-to-date" },
    { id: 8, title: "Notepad++", version: "8.6.4", date: "2024-05-03", status: "up-to-date" },
    { id: 9, title: "7-Zip", version: "24.00", date: "2024-05-02", status: "down-to-date" },
    { id: 10, title: "Skype", version: "8.112.0.211", date: "2024-05-01", status: "up-to-date" },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="bg-gradient-to-r rounded-2xl shadow flex flex-col">
        <TitleInfo title={t('inventory.device-info-software')} />
        <div className="overflow-x-auto pt-4">
          <table className="min-w-full text-xs text-blue-700 dark:text-blue-200">
            <thead>
            <tr className="border-b border-blue-200 dark:border-blue-700">
              <th className="px-2 py-1 text-left">ID</th>
              <th className="px-2 py-1 text-left">Título</th>
              <th className="px-2 py-1 text-left">Versión</th>
              <th className="px-2 py-1 text-left">Fecha de instalación</th>
              <th className="px-2 py-1 text-left">Alerta</th>
            </tr>
            </thead>
            <tbody>
            {demoInstalledSoftware.map((prog) => (
              <tr key={prog.id} className="border-b border-blue-100 dark:border-blue-800">
              <td className="px-2 py-1">{prog.id}</td>
              <td className="px-2 py-1">{prog.title}</td>
              <td className="px-2 py-1">{prog.version}</td>
              <td className="px-2 py-1">{prog.date}</td>
              <td className="px-2 py-1">
                {(prog.status === "up-to-date") ? (
                  <button
                    className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-800 transition"
                  >
                    {t('inventory.up-to-date')}
                  </button>
                ) : (
                  <button
                    className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
                  >
                    {t('inventory.down-to-date')}
                  </button>
                )}
              </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}

export default SoftwareStatus;