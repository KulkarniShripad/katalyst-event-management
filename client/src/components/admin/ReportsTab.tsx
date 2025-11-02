import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, TrendingUp, Users, Target, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ReportsTab = () => {
  const [selectedEvent, setSelectedEvent] = useState("1");

  const handleGenerateReport = () => {
    toast.success("Report generated successfully!", {
      description: "The PDF report has been downloaded to your device.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Event Reports</h2>
          <p className="text-muted-foreground">Generate detailed analytics and insights</p>
        </div>
        <Button onClick={handleGenerateReport} variant="gradient">
          <Download className="w-4 h-4 mr-2" />
          Generate PDF Report
        </Button>
      </div>

      {/* Event Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Event</CardTitle>
          <CardDescription>Choose an event to view its detailed report</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Women in AI Workshop</SelectItem>
              <SelectItem value="2">Robotics & Innovation Summit</SelectItem>
              <SelectItem value="3">Data Science Bootcamp</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Registrations</CardDescription>
              <Users className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-xs text-muted-foreground mt-1">+23% from last event</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-success">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Attendance Rate</CardDescription>
              <Target className="w-5 h-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground mt-1">139 of 156 attended</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Lead Conversion</CardDescription>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground mt-1">42 leads converted</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary-glow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Satisfaction Score</CardDescription>
              <Award className="w-5 h-5 text-primary-glow" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 5.0 stars</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Demographics Breakdown</CardTitle>
            <CardDescription>Student distribution by year</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>1st Year</span>
                <span className="font-medium">32%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: "32%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>2nd Year</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: "28%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>3rd Year</span>
                <span className="font-medium">25%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: "25%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>4th Year</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-primary" style={{ width: "15%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Field of Study</CardTitle>
            <CardDescription>Distribution across STEM fields</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Computer Science</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "45%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Engineering</span>
                <span className="font-medium">30%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "30%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mathematics</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "15%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Other STEM</span>
                <span className="font-medium">10%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "10%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsTab;
