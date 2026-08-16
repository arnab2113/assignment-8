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
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">
              Prop
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">
              Default
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-slate-100">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm font-mono text-blue-600 dark:text-blue-400">
                {row.prop}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-slate-400">
                {row.type}
              </td>
              <td className="px-4 py-3 text-sm font-mono text-gray-500 dark:text-slate-400">
                {row.default}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-slate-300">
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
