interface PropsTableProps {
  data: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
}

const PropsTable = ({ data }: PropsTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 transition-colors">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-zinc-200">Prop</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-zinc-200">Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-zinc-200">
              Default
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-zinc-200">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors">
              <td className="px-4 py-3 text-sm font-mono text-blue-600 dark:text-blue-400">
                {row.prop}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-zinc-400">
                {row.type}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-500 dark:text-zinc-500">
                {row.default}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-zinc-300">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
