import TitleCard from "./TitleCard"

const userSourceData = [
    {source : "Facebook Ads", count : "26,345", conversionPercent : 10.2},
    {source : "Google Ads", count : "21,341", conversionPercent : 11.7},
    {source : "Instagram Ads", count : "34,379", conversionPercent : 12.4},
    {source : "Affiliates", count : "12,359", conversionPercent : 20.9},
    {source : "Organic", count : "10,345", conversionPercent : 10.3},
]

function UserChannels(){
    return(
        <TitleCard title={"User Signup Source"}>
            {/* Table Data */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-500 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">Source</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">No of Users</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-200">Conversion</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            userSourceData.map((u, k) => (
                                <tr key={k}>
                                    <td className="px-4 py-2">{k+1}</td>
                                    <td className="px-4 py-2">{u.source}</td>
                                    <td className="px-4 py-2">{u.count}</td>
                                    <td className="px-4 py-2">{`${u.conversionPercent}%`}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels