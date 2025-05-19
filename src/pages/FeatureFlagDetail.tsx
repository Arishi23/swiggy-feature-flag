import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Mock data for segments to select
const mockSegments = [
  { id: 1, name: "New Users" },
  { id: 2, name: "Power User" },
  { id: 3, name: "Swiggy One Members" },
  { id: 4, name: "High AOV Users" },
  { id: 5, name: "iOS users" },
];

// Mock feature flag data
const mockFeatureFlags = {
  1: {
    id: 1,
    name: "Visibility",
    status: { dev: true, staging: false, prod: false },
    segments: [{ id: 3, name: "Swiggy One Members" }],
    progressiveRollout: true
  },
  2: {
    id: 2,
    name: "In-App Chat Support",
    status: { dev: true, staging: true, prod: true },
    segments: [{ id: 2, name: "Power User" }],
    progressiveRollout: false
  },
  3: {
    id: 3,
    name: "Group Ordering",
    status: { dev: true, staging: true, prod: false },
    segments: [{ id: 5, name: "iOS users" }],
    progressiveRollout: true
  }
};

const FeatureFlagDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const featureFlagId = parseInt(id || "1");
  
  // In a real app, you would fetch the feature flag data from your backend
  const featureFlag = mockFeatureFlags[featureFlagId as keyof typeof mockFeatureFlags] || mockFeatureFlags[1];
  
  const [environment, setEnvironment] = useState<"dev" | "staging" | "prod">("dev");
  const [enabled, setEnabled] = useState(featureFlag.status[environment]);
  const [selectedSegment, setSelectedSegment] = useState(featureFlag.segments[0]?.id.toString() || "");
  const [progressiveRollout, setProgressiveRollout] = useState(featureFlag.progressiveRollout);

  const handleEnvironmentChange = (value: string) => {
    if (value === "dev" || value === "staging" || value === "prod") {
      setEnvironment(value);
      setEnabled(featureFlag.status[value]); // Update enabled status based on the selected environment
    }
  };

  const handleSave = () => {
    // In a real app, you would update the feature flag settings on your backend
    toast({
      title: "Success",
      description: `${featureFlag.name} settings for ${environment} environment saved successfully.`,
    });
    
    navigate("/feature-flags");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Feature Flags / {featureFlag.name}
        </h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/feature-flags")}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            Save
          </Button>
        </div>
      </div>

      <div className="bg-green-100 rounded-lg shadow p-6">
        <div className="mb-6">
          <Label className="text-sm font-medium mb-2 block">Environment</Label>
          <ToggleGroup
            type="single"
            value={environment}
            onValueChange={handleEnvironmentChange}
            className="justify-start border rounded-md overflow-hidden w-fit"
          >
            <ToggleGroupItem value="dev" className="data-[state=on]:bg-green-600 data-[state=on]:text-white px-6">
              Dev
            </ToggleGroupItem>
            <ToggleGroupItem value="staging" className="data-[state=on]:bg-green-600 data-[state=on]:text-white px-6">
              Staging
            </ToggleGroupItem>
            <ToggleGroupItem value="prod" className="data-[state=on]:bg-green-600 data-[state=on]:text-white px-6">
              Prod
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">{featureFlag.name}</Label>
              <p className="text-sm text-gray-600">Enable or disable this feature flag</p>
            </div>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <>
              <div className="space-y-3">
                <Label className="text-base font-medium">Segments</Label>
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select segment" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSegments.map((segment) => (
                      <SelectItem key={segment.id} value={segment.id.toString()}>
                        {segment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Progressive Roll-out</Label>
                  <p className="text-sm text-gray-600">Gradually roll out this feature</p>
                </div>
                <Switch checked={progressiveRollout} onCheckedChange={setProgressiveRollout} />
              </div>

              {progressiveRollout && (
                <div className="bg-white p-4 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Configuration options for progressive rollout would go here.
                  </p>
                  {/* Additional progressive rollout options would go here */}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureFlagDetail;
