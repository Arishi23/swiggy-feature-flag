
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for feature flags with environment status
const mockFeatureFlags = [
  { 
    id: 1, 
    name: "Live Order Tracking", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: true, percentage: 50 },
      prod: { enabled: false, percentage: 0 }
    }
  },
  { 
    id: 2, 
    name: "In-App Chat Support", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: true, percentage: 100 },
      prod: { enabled: true, percentage: 30 }
    }
  },
  { 
    id: 3, 
    name: "Swiggy One Members", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: true, percentage: 100 },
      prod: { enabled: true, percentage: 100 }
    }
  },
  { 
    id: 4, 
    name: "Group Ordering", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: true, percentage: 75 },
      prod: { enabled: false, percentage: 0 }
    }
  },
  { 
    id: 5, 
    name: "Restaurant Loyalty Program", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: true, percentage: 100 },
      prod: { enabled: true, percentage: 20 }
    }
  },
  { 
    id: 6, 
    name: "Voice Ordering", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: false, percentage: 0 },
      prod: { enabled: false, percentage: 0 }
    }
  },
  { 
    id: 7, 
    name: "Dark Mode", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: true, percentage: 100 },
      prod: { enabled: true, percentage: 100 }
    }
  },
  { 
    id: 8, 
    name: "Multi-Restaurant Orders", 
    environments: {
      dev: { enabled: true, percentage: 100 },
      staging: { enabled: true, percentage: 50 },
      prod: { enabled: false, percentage: 0 }
    }
  },
];

const FeatureFlagsPage = () => {
  const navigate = useNavigate();
  const [featureFlags] = useState(mockFeatureFlags);

  const handleFlagClick = (id: number) => {
    navigate(`/feature-flags/${id}`);
  };

  const handleCreateNew = () => {
    navigate(`/feature-flags/create`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feature Flags</h1>
          <p className="text-gray-600">Manage feature flags across different environments</p>
        </div>
        <Button onClick={handleCreateNew} className="bg-green-600 hover:bg-green-700">
          Create New
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature Flag</TableHead>
              <TableHead className="text-center">Dev</TableHead>
              <TableHead className="text-center">Staging</TableHead>
              <TableHead className="text-center">Prod</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featureFlags.map((flag) => (
              <TableRow 
                key={flag.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleFlagClick(flag.id)}
              >
                <TableCell className="font-medium">{flag.name}</TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <span className={flag.environments.dev.enabled ? "text-green-600" : "text-red-600"}>
                      {flag.environments.dev.enabled ? "ON" : "OFF"}
                    </span>
                    <span className="text-xs text-gray-500">{flag.environments.dev.percentage}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <span className={flag.environments.staging.enabled ? "text-green-600" : "text-red-600"}>
                      {flag.environments.staging.enabled ? "ON" : "OFF"}
                    </span>
                    <span className="text-xs text-gray-500">{flag.environments.staging.percentage}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <span className={flag.environments.prod.enabled ? "text-green-600" : "text-red-600"}>
                      {flag.environments.prod.enabled ? "ON" : "OFF"}
                    </span>
                    <span className="text-xs text-gray-500">{flag.environments.prod.percentage}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeatureFlagsPage;
