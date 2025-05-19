
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

const data = [
  { name: 'Jun', value: 2 },
  { name: 'Jul', value: 3 },
  { name: 'Aug', value: 5 },
  { name: 'Sep', value: 4 },
  { name: 'Oct', value: 6 },
];

export const FeatureFlagCreationChart: React.FC<ChartProps> = ({ dateRange }) => {
  return (
    <div className="space-y-4">
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-center text-gray-500">
        {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
      </div>
    </div>
  );
};
