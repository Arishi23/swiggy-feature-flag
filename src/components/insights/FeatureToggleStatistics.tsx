
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ToggleData {
  id: number;
  name: string;
  toggles: number;
  percentage: string;
}

const data: ToggleData[] = [
  { id: 3, name: "Group Ordering", toggles: 11, percentage: "20%" },
  { id: 2, name: "In-App Chat Support", toggles: 10, percentage: "12%" },
  { id: 1, name: "Live Order Tracking", toggles: 8, percentage: "12%" },
];

export const FeatureToggleStatistics: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/feature-flags/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 text-sm font-medium text-gray-500">
        <div>Feature Flag</div>
        <div className="text-center">Toggles</div>
        <div className="text-center">% of total</div>
      </div>
      <div className="space-y-2">
        {data.map((item) => (
          <div 
            key={item.id} 
            className="grid grid-cols-3 text-sm py-2 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleRowClick(item.id)}
          >
            <div className="font-medium">{item.name}</div>
            <div className="text-center">{item.toggles}</div>
            <div className="text-center">{item.percentage}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
