import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import axios from "axios";


const LeadsTab = () => {
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [allLeads, setAllLeads] = useState([]); 

  useEffect( () => {
    const fetchEvents = async () => {
      try { 
        const response = await axios.get('http://localhost:5000/api/admin/displayAllLeads');
        setAllLeads(response.data);
        console.log("Fetched events:", response.data);
      }catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  const handleExportCSV = () => {
    // Simulate CSV export
    const csv = allLeads.map(lead => 
      `${lead.name},${lead.email},${lead.event},${lead.createdAt}`
    ).join("\n");
    
    toast.success("CSV exported successfully!", {
      description: `${allLeads.length} leads exported`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Leads Management</h2>
          <p className="text-muted-foreground">View and export interested students data</p>
        </div>
        <Button onClick={handleExportCSV} variant="gradient">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Leads</CardDescription>
            <CardTitle className="text-3xl">{allLeads.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-3xl">68%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedEvent} onValueChange={setSelectedEvent}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Filter by event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="Women in AI Workshop">Women in AI Workshop</SelectItem>
            <SelectItem value="Robotics Summit">Robotics Summit</SelectItem>
            <SelectItem value="Data Science Bootcamp">Data Science Bootcamp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Event Id</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.eventId}</TableCell>
                  <TableCell>{new Date(lead.createdAt).toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short"
})}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Interested</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {allLeads.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No leads found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadsTab;
