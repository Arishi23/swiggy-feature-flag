import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Mock data for attributes
const attributes = [
  { id: 1, name: "Platform", values: ["iOS", "Android", "Web"] },
  { id: 2, name: "User Type", values: ["New", "Returning", "Premium"] },
  { id: 3, name: "City", values: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"] },
  { id: 4, name: "Order Value", values: ["> ₹100", "> ₹500", "> ₹1000"] },
];

const SegmentCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [conditions, setConditions] = useState<Array<{ attribute: string; value: string }>>([
    { attribute: "", value: "" },
  ]);

  const handleAddCondition = () => {
    setConditions([...conditions, { attribute: "", value: "" }]);
  };

  const handleConditionChange = (index: number, field: "attribute" | "value", value: string) => {
    const newConditions = [...conditions];
    newConditions[index][field] = value;
    setConditions(newConditions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Segment name is required",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would save the segment to your backend here
    toast({
      title: "Success",
      description: "Segment has been created",
    });
    
    // Navigate back to segments list
    navigate("/segments");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create Segment</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/segments")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Save & Exit
          </Button>
        </div>
      </div>

      <div className="bg-green-100 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Enter your Segment Name:</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Premium Users"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Enter a quick description of your segment:</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Users who have purchased a premium plan"
                className="mt-1"
              />
            </div>

            <div className="pt-4">
              <h3 className="font-medium text-gray-700 mb-2">User</h3>
              
              {conditions.map((condition, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <div className="w-1/2">
                    <Label>Attribute</Label>
                    <Select
                      value={condition.attribute}
                      onValueChange={(value) => handleConditionChange(index, "attribute", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose attribute" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributes.map((attr) => (
                          <SelectItem key={attr.id} value={attr.name}>
                            {attr.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-1/2">
                    <Label>Value</Label>
                    <Select
                      value={condition.value}
                      onValueChange={(value) => handleConditionChange(index, "value", value)}
                      disabled={!condition.attribute}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributes
                          .find((attr) => attr.name === condition.attribute)
                          ?.values.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddCondition}
                className="mt-2"
              >
                Add+
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SegmentCreate;
