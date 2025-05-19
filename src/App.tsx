
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import SegmentsPage from "./pages/SegmentsPage";
import SegmentCreate from "./pages/SegmentCreate";
import FeatureFlagsPage from "./pages/FeatureFlagsPage";
import FeatureFlagDetail from "./pages/FeatureFlagDetail";
import InsightsPage from "./pages/InsightsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/segments" element={<Layout><SegmentsPage /></Layout>} />
          <Route path="/segments/create" element={<Layout><SegmentCreate /></Layout>} />
          <Route path="/feature-flags" element={<Layout><FeatureFlagsPage /></Layout>} />
          <Route path="/feature-flags/:id" element={<Layout><FeatureFlagDetail /></Layout>} />
          <Route path="/insights" element={<Layout><InsightsPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
