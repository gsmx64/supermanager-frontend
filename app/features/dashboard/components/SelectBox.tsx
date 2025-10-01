import { useState } from 'react';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';


interface OptionType {
  value?: string;
  name: string;
}

interface SelectBoxProps {
  labelTitle: string;
  labelDescription?: string;
  defaultValue?: string;
  containerStyle?: string;
  placeholder?: string;
  labelStyle?: string;
  options: OptionType[];
  updateType: string;
  updateFormValue: (args: { updateType: string; value: string }) => void;
}

export default function SelectBox(props: SelectBoxProps){ 
  const {
    labelTitle,
    labelDescription,
    defaultValue,
    containerStyle,
    placeholder,
    labelStyle,
    options,
    updateType,
    updateFormValue
  } = props
  const [value, setValue] = useState(defaultValue || "")

  const updateValue = (newValue: string) => {
    updateFormValue({updateType, value : newValue});
    setValue(newValue);
  }

  return (
    <div className={`inline-block w-full ${containerStyle}`}>
      <label className={`flex items-center gap-2 mb-2 ${labelStyle}`}>
        <span className="font-medium text-gray-700 dark:text-gray-200">{labelTitle}</span>
        {labelDescription && (
          <span className="relative group">
            <InformationCircleIcon className="w-4 h-4 text-gray-400 dark:text-gray-400 cursor-pointer" />
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 dark:bg-gray-800 text-white dark:text-gray-200 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              {labelDescription}
            </span>
          </span>
        )}
      </label>
      <select
        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      >
        <option disabled value="PLACEHOLDER">
          {placeholder}
        </option>
        {options.map((o, k) => (
          <option value={o.value || o.name} key={k}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  )
}