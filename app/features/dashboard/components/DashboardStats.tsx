type DashboardStatsProps = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  description: string;
  colorIndex: number;
};

export default function DashboardStats(
  {title, icon, value, description, colorIndex}: DashboardStatsProps){

  const COLORS = ['primary', 'primary'];

  const getDescStyle = () => {
      if(description.includes("↗︎")) return "font-bold text-green-600 dark:text-green-400"
      else if(description.includes("↙")) return "font-bold text-red-500 dark:text-red-400"
      else return '';
  }

  return (
    <div className="rounded-lg shadow-md p-4 bg-white dark:bg-slate-800 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className={`text-2xl dark:text-slate-300 text-${COLORS[colorIndex % 2]}`}>{icon}</span>
        <span className="text-sm font-medium dark:text-slate-300">{title}</span>
      </div>
      <div className={`text-3xl font-bold dark:text-slate-300 text-${COLORS[colorIndex % 2]}`}>{value}</div>
      <div className={"text-xs " + getDescStyle()}>{description}</div>
    </div>
  )
}