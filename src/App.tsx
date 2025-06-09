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
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./lib/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout><Index /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/segments"
              element={
                <ProtectedRoute>
                  <Layout><SegmentsPage /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/segments/create"
              element={
                <ProtectedRoute>
                  <Layout><SegmentCreate /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feature-flags"
              element={
                <ProtectedRoute>
                  <Layout><FeatureFlagsPage /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feature-flags/:id"
              element={
                <ProtectedRoute>
                  <Layout><FeatureFlagDetail /></Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/insights"
              element={
                <ProtectedRoute>
                  <Layout><InsightsPage /></Layout>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
