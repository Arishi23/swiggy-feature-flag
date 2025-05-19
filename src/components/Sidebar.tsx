
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FlagIcon, Users, BarChart3 } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Segments", href: "/segments", icon: Users },
    { name: "Feature Flags", href: "/feature-flags", icon: FlagIcon },
    { name: "Insights", href: "/insights", icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-green-100 border-r border-green-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-green-200">
        <h2 className="text-xl font-bold text-green-800">FeatureFlags</h2>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-2 text-sm font-medium rounded-md group",
                isActive
                  ? "bg-green-200 text-green-900"
                  : "text-green-700 hover:bg-green-200 hover:text-green-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-green-800" : "text-green-600 group-hover:text-green-800"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
