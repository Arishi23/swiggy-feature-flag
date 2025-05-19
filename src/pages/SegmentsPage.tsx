import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for segments
const mockSegments = [
  { id: 1, name: "New Users", description: "Signed up in the last 3 days" },
  { id: 2, name: "Power User", description: "+5 orders per week" },
  { id: 3, name: "Swiggy One Members", description: "Active Swiggy One Members" },
  { id: 4, name: "High AOV Users", description: "Users with avg. order value > ₹500" },
  { id: 5, name: "iOS users", description: "Users on iOS" },
];

const SegmentsPage = () => {
  const navigate = useNavigate();
  const [segments] = useState(mockSegments);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Segments</h1>
          <p className="text-gray-600">Create and manage user segments for your feature flags</p>
        </div>
        <Button onClick={() => navigate("/segments/create")} className="bg-green-600 hover:bg-green-700">
          Create New
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Segment Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {segments.map((segment) => (
              <TableRow key={segment.id}>
                <TableCell className="font-medium">{segment.name}</TableCell>
                <TableCell>{segment.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/segments/edit/${segment.id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SegmentsPage;
