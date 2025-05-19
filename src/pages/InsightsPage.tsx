
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { FeatureFlagsChart } from "@/components/insights/FeatureFlagsChart";
import { FeatureToggleStatistics } from "@/components/insights/FeatureToggleStatistics";
import { FeatureFlagCreationChart } from "@/components/insights/FeatureFlagCreationChart";
import { SegmentsCreationChart } from "@/components/insights/SegmentsCreationChart";
import { DateRange } from "react-day-picker";

const InsightsPage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const stats = [
    {
      title: "Number of feature flags",
      value: "10",
      change: "+20%"
    },
    {
      title: "Number of evaluations",
      value: "25.3k",
      change: "+14%"
    },
    {
      title: "Number of Segments",
      value: "5",
      change: "+25%"
    },
    {
      title: "Number of feature toggles",
      value: "5",
      change: "+25%"
    }
  ];

  const inactiveFlags = [
    { id: 101, name: "Re-order", daysInactive: 15 },
    { id: 102, name: "Instamart recommendations", daysInactive: 23 },
    { id: 103, name: "Explore page 2.0", daysInactive: 7 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
          <p className="text-gray-600">Analytics and statistics for your feature flags</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={dateRange as DateRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({ from: range.from, to: range.to });
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-green-600">
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-xs text-gray-500 -mt-2">
        * All changes compared to previous period
      </div>

      {/* Feature Flags Performance */}
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle>Feature Flag Usage</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <FeatureFlagsChart />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Actively Toggled Feature Flags */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Actively Toggled Feature Flags</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <FeatureToggleStatistics />
          </CardContent>
        </Card>

        {/* Feature Flags Created */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Feature Flags Created</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <FeatureFlagCreationChart dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inactive Feature Flags */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Inactive Feature Flags</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="grid grid-cols-2 text-sm font-medium text-gray-500 mb-1">
                <div>Feature Flag</div>
                <div className="text-right">Days Inactive</div>
              </div>
              {inactiveFlags.map((flag) => (
                <div 
                  key={flag.id} 
                  className="grid grid-cols-2 border-b pb-2 last:border-b-0 cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/feature-flags/${flag.id}`)}
                >
                  <span className="font-medium">{flag.name}</span>
                  <span className="text-right text-orange-500 font-medium">{flag.daysInactive} days</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">
              • Consider removing the above feature flags to keep your code base clean
            </div>
          </CardContent>
        </Card>

        {/* Segments Created */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Segments Created</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <SegmentsCreationChart dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPage;
