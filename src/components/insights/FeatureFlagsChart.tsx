
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronRight, SortAsc, SortDesc, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FlagData {
  name: string;
  dev: number;
  devChange: string;
  staging: number;
  stagingChange: string;
  production: number;
  productionChange: string;
}

const initialData: FlagData[] = [
  { 
    name: "Live Order Tracking", 
    dev: 10200, 
    devChange: "+10%", 
    staging: 8500, 
    stagingChange: "+8%", 
    production: 12300, 
    productionChange: "+15%" 
  },
  { 
    name: "In-App Chat Support", 
    dev: 8700, 
    devChange: "+5%", 
    staging: 7200, 
    stagingChange: "-3%", 
    production: 9800, 
    productionChange: "+12%" 
  },
  { 
    name: "Swiggy One Members", 
    dev: 9500, 
    devChange: "+7%", 
    staging: 8900, 
    stagingChange: "+6%", 
    production: 11000, 
    productionChange: "+9%" 
  },
  { 
    name: "Group Ordering", 
    dev: 11200, 
    devChange: "+12%", 
    staging: 9500, 
    stagingChange: "+10%", 
    production: 0, 
    productionChange: "0%" 
  },
  { 
    name: "Restaurant Loyalty Program", 
    dev: 9800, 
    devChange: "+8%", 
    staging: 9000, 
    stagingChange: "+7%", 
    production: 5000, 
    productionChange: "+4%" 
  },
  { 
    name: "Voice Ordering", 
    dev: 7500, 
    devChange: "+6%", 
    staging: 0, 
    stagingChange: "0%", 
    production: 0, 
    productionChange: "0%" 
  },
  { 
    name: "Dark Mode", 
    dev: 12000, 
    devChange: "+15%", 
    staging: 11500, 
    stagingChange: "+14%", 
    production: 10800, 
    productionChange: "+13%" 
  },
  { 
    name: "Multi-Restaurant Orders", 
    dev: 9000, 
    devChange: "+9%", 
    staging: 7500, 
    stagingChange: "+5%", 
    production: 0, 
    productionChange: "0%" 
  }
];

export const FeatureFlagsChart = () => {
  const [data, setData] = useState<FlagData[]>(initialData);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof FlagData | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });
  const [filters, setFilters] = useState<{
    showZeroProduction: boolean;
  }>({ showZeroProduction: true });

  const formatNumber = (num: number) => {
    return num === 0 ? '0' : (num / 1000).toFixed(1) + 'K';
  };
  
  const getChangeClass = (change: string) => {
    return change.startsWith('+') ? 'text-green-600' : change === '0%' ? 'text-gray-500' : 'text-red-600';
  };

  const sortData = (key: keyof FlagData) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      return setSortConfig({ key: null, direction: null });
    }
    
    setSortConfig({ key, direction });
    
    const sortedData = [...initialData].sort((a, b) => {
      if (key === 'name') {
        return direction === 'asc' 
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else {
        const valueA = a[key];
        const valueB = b[key];
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return direction === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return 0;
      }
    });
    
    setData(sortedData);
  };
  
  const applyFilters = () => {
    let filteredData = [...initialData];
    
    if (!filters.showZeroProduction) {
      filteredData = filteredData.filter(item => item.production > 0);
    }
    
    // Re-apply sorting if needed
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (sortConfig.key === 'name') {
          return sortConfig.direction === 'asc' 
            ? a[sortConfig.key].localeCompare(b[sortConfig.key])
            : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        } else if (sortConfig.key) {
          const valueA = a[sortConfig.key];
          const valueB = b[sortConfig.key];
          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortConfig.direction === 'asc' ? valueA - valueB : valueB - valueA;
          }
        }
        return 0;
      });
    }
    
    setData(filteredData);
  };
  
  // Apply filters whenever they change
  React.useEffect(() => {
    applyFilters();
  }, [filters]);

  const getSortIcon = (key: keyof FlagData) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? (
      <SortAsc className="h-4 w-4 ml-1" />
    ) : (
      <SortDesc className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-2">
              <h4 className="font-medium">Filters</h4>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-zero" 
                  checked={filters.showZeroProduction}
                  onCheckedChange={(checked) => {
                    setFilters({ ...filters, showZeroProduction: checked === true });
                  }}
                />
                <Label htmlFor="show-zero">Show flags with no feature flag</Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead 
              className="w-[200px] font-medium text-foreground cursor-pointer"
              onClick={() => sortData('name')}
            >
              <div className="flex items-center">
                Feature Flag
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead 
              className="font-medium text-foreground cursor-pointer"
              onClick={() => sortData('dev')}
            >
              <div className="flex items-center">
                Dev
                {getSortIcon('dev')}
              </div>
            </TableHead>
            <TableHead 
              className="font-medium text-foreground cursor-pointer"
              onClick={() => sortData('staging')}
            >
              <div className="flex items-center">
                Staging
                {getSortIcon('staging')}
              </div>
            </TableHead>
            <TableHead 
              className="font-medium text-foreground cursor-pointer"
              onClick={() => sortData('production')}
            >
              <div className="flex items-center">
                Production
                {getSortIcon('production')}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name} className="hover:bg-muted/30">
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">{formatNumber(row.dev)}</div>
                    <span className={getChangeClass(row.devChange)}>{row.devChange}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">{formatNumber(row.staging)}</div>
                    <span className={getChangeClass(row.stagingChange)}>{row.stagingChange}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div>
                    <div className="font-medium">{formatNumber(row.production)}</div>
                    <span className={getChangeClass(row.productionChange)}>{row.productionChange}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer hover:text-primary" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
