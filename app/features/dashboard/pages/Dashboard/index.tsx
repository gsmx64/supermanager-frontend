import { useTranslation } from "react-i18next";

import toToast from "@/core/utils/toToast";
import UserGroupIcon  from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon  from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon  from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon  from "@heroicons/react/24/outline/CreditCardIcon";
import DashboardStats from "@/features/dashboard/components/DashboardStats";
import AmountStats from "@/features/dashboard/components/AmountStats";
import PageStats from "@/features/dashboard/components/PageStats";
import UserChannels from "@/features/dashboard/components/UserChannels";
import LineChart from "@/features/dashboard/components/LineChart";
import BarChart from "@/features/dashboard/components/BarChart";
import DashboardTopBar from "@/features/dashboard/components/DashboardTopBar";
import DoughnutChart from "@/features/dashboard/components/DoughnutChart";
import type { Route } from ".react-router/types/app/features/dashboard/pages/Dashboard/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation('dashboard');
  return [
    { title: t('title') },
    { name: t('meta_name'), content: t('meta_content') },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {

}


function Dashboard() {

  const statsData = [
    {title : "New Users", value : "34.7k", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ 2300 (22%)"},
    {title : "Total Sales", value : "$34,545", icon : <CreditCardIcon className='w-8 h-8'/>, description : "Current month"},
    {title : "Pending Leads", value : "450", icon : <CircleStackIcon className='w-8 h-8'/>, description : "50 in hot leads"},
    {title : "Active Users", value : "5.6k", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
  ];

  const updateDashboardPeriod = (newRange: any) => {
    // Dashboard range changed, write code to refresh your values
    toToast({
      description: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
      title: 'Notification',
      color: "primary",
    });
  }

  return (
    <>
      {/* ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/>
        
      {/* ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        {
          statsData.map((d, k) => (
            <DashboardStats key={k} {...d} colorIndex={k}/>
          ))
        }
      </div>

      {/* ---------------------- Different charts ------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <LineChart />
        <BarChart />
      </div>
            
      {/* ---------------------- Different stats content 2 ------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <AmountStats />
        <PageStats />
      </div>

      {/* ---------------------- User source channels table  ------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <UserChannels />
        <DoughnutChart />
      </div>
    </>
  )
}

export default Dashboard;