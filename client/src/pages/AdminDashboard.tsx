import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut, Calendar, QrCode, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import EventsTab from "@/components/admin/EventsTab";
import AttendanceTab from "@/components/admin/AttendanceTab";
import LeadsTab from "@/components/admin/LeadsTab";
import ReportsTab from "@/components/admin/ReportsTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    // Check if admin is logged in
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent block">
                  Katalyst
                </span>
                <span className="text-xs text-muted-foreground">Admin Dashboard</span>
              </div>
            </Link>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin</h1>
          <p className="text-muted-foreground">Manage your events, track attendance, and analyze leads all in one place.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Leads</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <EventsTab />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <AttendanceTab />
          </TabsContent>

          <TabsContent value="leads" className="space-y-4">
            <LeadsTab />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
