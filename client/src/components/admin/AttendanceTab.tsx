import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Hash, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const AttendanceTab = () => {
  // const [selectedEvent, setSelectedEvent] = useState("");
  const [registrationId, setregistrationId] = useState("");
  const [scanMode, setScanMode] = useState<"qr" | "manual">("manual");

  const handleMarkAttendance = async () => {
    if ( !registrationId) {
      toast.error("Please select an event and enter tracking ID");
      return;
    }
    console.log(registrationId)
    
    try { 
      const response = await axios.post(`http://localhost:5000/api/admin/markAttendance/${registrationId}`);
      if(response.status === 201){
        console.log("Success", response.data);
      toast.success("Attendance marked successfully!", {
        description: `Tracking ID: ${registrationId}`,
      });
    }else{
      toast.error("Failed to mark attendance. Please check the tracking ID and try again.");
    }
    }catch (error) {
      console.error("Error fetching events:", error);
    }finally{
      setregistrationId("");
    }
    
  };

  const handleQRScan = () => {
    toast.info("QR Scanner would open here (camera access required)");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Mark Attendance</h2>
        <p className="text-muted-foreground">Scan QR codes or manually enter tracking IDs</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Scan/Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Input</CardTitle>
            <CardDescription>Choose your preferred method to mark attendance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="space-y-2">
              <Label>Select Event</Label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Women in AI Workshop</SelectItem>
                  <SelectItem value="2">Robotics & Innovation Summit</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <div className="flex gap-2">
              <Button
                variant={scanMode === "qr" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setScanMode("qr")}
              >
                <Camera className="w-4 h-4 mr-2" />
                QR Scan
              </Button>
              <Button
                variant={scanMode === "manual" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setScanMode("manual")}
              >
                <Hash className="w-4 h-4 mr-2" />
                Manual Entry
              </Button>
            </div>

            {scanMode === "qr" ? (
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Camera feed would appear here</p>
                  </div>
                </div>
                <Button onClick={handleQRScan} variant="gradient" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Start QR Scanner
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking-id">Tracking ID</Label>
                  <Input
                    id="tracking-id"
                    placeholder="Enter tracking ID (e.g., TRK-123456)"
                    value={registrationId}
                    onChange={(e) => setregistrationId(e.target.value)}
                  />
                </div>
                <Button onClick={handleMarkAttendance} variant="success" className="w-full">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Mark as Attended
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 5 attendance records</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: "TRK-1234567890", name: "Sarah Johnson", time: "2 mins ago", event: "Women in AI Workshop" },
              { id: "TRK-9876543210", name: "Priya Sharma", time: "5 mins ago", event: "Robotics Summit" },
              { id: "TRK-5555555555", name: "Maria Garcia", time: "8 mins ago", event: "Women in AI Workshop" },
              { id: "TRK-1111111111", name: "Aisha Khan", time: "12 mins ago", event: "Data Science Bootcamp" },
              { id: "TRK-2222222222", name: "Lisa Chen", time: "15 mins ago", event: "Women in AI Workshop" },
            ].map((record) => (
              <div
                key={record.id}
                className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <p className="font-medium text-sm">{record.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{record.event}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{record.id}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{record.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceTab;
