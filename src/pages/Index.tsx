import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Swiggy Feature Flag Management</h1>
          <p className="text-gray-600">Easily manage feature flags and target specific user segments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Segments</h2>
            <p className="text-gray-600 mb-6 text-center">
              Create and manage user segments to target specific Swiggy users for your feature flags.
            </p>
            <Button 
              onClick={() => navigate('/segments')}
              className="w-full"
            >
              Manage Segments
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Feature Flags</h2>
            <p className="text-gray-600 mb-6 text-center">
              Enable or disable feature flags for different environments and user segments.
            </p>
            <Button 
              onClick={() => navigate('/feature-flags')}
              className="w-full"
            >
              Manage Feature Flags
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
