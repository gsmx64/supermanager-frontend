import HeartIcon  from '@heroicons/react/24/outline/HeartIcon';
import BoltIcon  from '@heroicons/react/24/outline/BoltIcon';


export default function PageStats({}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex-1 flex items-center space-x-4">
        <div className="hidden md:block">
          <HeartIcon className="w-8 h-8 text-pink-500 dark:text-pink-400" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Likes</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">25.6K</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">21% more than last month</div>
        </div>
      </div>
      <div className="flex-1 flex items-center space-x-4">
        <div className="hidden md:block">
          <BoltIcon className="w-8 h-8 text-yellow-500 dark:text-yellow-400" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Page Views</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">2.6M</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">14% more than last month</div>
        </div>
      </div>
    </div>
  )
}