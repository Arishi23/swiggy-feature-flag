import React from "react";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <div className="flex justify-end p-4">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-sm"
          >
            Logout
          </Button>
        </div>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
