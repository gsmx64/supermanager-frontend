function AmountStats({}){
    return (
        <div className="flex gap-6 bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
            <div className="flex flex-col flex-1 border-r pr-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Amount to be Collected</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">$25,600</div>
                <div>
                    <button className="text-xs px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-200 rounded hover:bg-blue-600 transition">View Users</button>
                </div>
            </div>
            <div className="flex flex-col flex-1 pl-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Cash in hand</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">$5,600</div>
                <div>
                    <button className="text-xs px-3 py-1 bg-green-500 dark:bg-green-600 text-white dark:text-gray-200 rounded hover:bg-green-600 transition">View Members</button>
                </div>
            </div>
        </div>
    )
}

export default AmountStats;