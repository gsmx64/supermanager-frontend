import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import type { DateValueType } from 'react-tailwindcss-datepicker';

import ArrowDownTrayIcon  from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import ShareIcon  from '@heroicons/react/24/outline/ShareIcon';
import EnvelopeIcon  from '@heroicons/react/24/outline/EnvelopeIcon';
import EllipsisVerticalIcon  from '@heroicons/react/24/outline/EllipsisVerticalIcon';
import ArrowPathIcon  from '@heroicons/react/24/outline/ArrowPathIcon';

import SelectBox from './SelectBox';
import { Button } from '@heroui/react';


const periodOptions = [
  {name : "Today", value : "TODAY"},
  {name : "Yesterday", value : "YESTERDAY"},
  {name : "This Week", value : "THIS_WEEK"},
  {name : "Last Week", value : "LAST_WEEK"},
  {name : "This Month", value : "THIS_MONTH"},
  {name : "Last Month", value : "LAST_MONTH"},
]

interface DashboardTopBarProps {
  updateDashboardPeriod: (value: { startDate: Date; endDate: Date }) => void;
}

export default function DashboardTopBar({updateDashboardPeriod}: DashboardTopBarProps){

  const [dateValue, setDateValue] = useState({ 
      startDate: new Date(), 
      endDate: new Date() 
  }); 

  const handleDatePickerValueChange = (value: DateValueType, e?: HTMLInputElement | null) => {
      if (!value || !value.startDate || !value.endDate) return;
      // Convert to Date objects if necessary
      const startDate = value.startDate instanceof Date ? value.startDate : new Date(value.startDate);
      const endDate = value.endDate instanceof Date ? value.endDate : new Date(value.endDate);
      const newValue = { startDate, endDate };
      console.log("newValue:", newValue); 
      setDateValue(newValue); 
      updateDashboardPeriod(newValue);
  }

  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Datepicker 
          containerClassName="w-72"
          value={dateValue}
          inputClassName="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          popoverDirection="down"
          toggleClassName="invisible"
          onChange={handleDatePickerValueChange}
          showShortcuts={true}
          primaryColor="yellow"
        />
        {/* 
        <SelectBox 
          options={periodOptions}
          labelTitle="Period"
          placeholder="Select date range"
          containerStyle="w-72"
          labelStyle="hidden"
          defaultValue="TODAY"
          updateFormValue={updateSelectBoxValue}
        /> */}
      </div>
      <div className="flex justify-end items-center space-x-2">
        <Button className="flex items-center px-3 py-1 text-sm font-medium border rounded transition text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
          <ArrowPathIcon className="w-4 mr-2" />
          Refresh Data
        </Button>
        <Button className="flex items-center px-3 py-1 text-sm font-medium border rounded transition text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
          <ShareIcon className="w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}