/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const TrackRegistration = () => {
  const [registrationId, setregistrationId] = useState("");
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!registrationId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking ID",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    
    try {
       const response = await axios.get(`http://localhost:5000/api/student/getSpecificEvent/${registrationId}`);
       if(response.status === 201){
        setRegistrationData(response.data.Event);
        console.log("Registration Data:", response.data);
        toast({
          title: "Registration Found",
          description: "Your event details have been loaded successfully",
        });
        }else{
            setRegistrationData(null);
            toast({
                title: "Not Found",
                description: "No registration found with the provided tracking ID.",
                variant: "destructive",
            });
        }
    } catch (error) {
      setRegistrationData(null);
      toast({
        title: "Error",
        description: "Failed to fetch registration data. Please try again later.",
        variant: "destructive",
      });
        
    }
    finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-primary";
      case "Ongoing":
        return "bg-success";
      case "Completed":
        return "bg-muted";
      case "Cancelled":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* <Navbar /> */}
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mb-4">
              Track Your Registration
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your tracking ID to view your event registration details
            </p>
          </div>

          <Card className="mb-8 border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter your tracking ID (e.g., REG-12345)"
                  value={registrationId}
                  onChange={(e) => setregistrationId(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-6"
                  variant="gradient"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {registrationData && (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-elegant animate-fade-in">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">
                      {registrationData.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Tracking ID: <span className="font-mono font-semibold">{registrationId}</span>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(registrationData.status)}>
                    {registrationData.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Description</h3>
                  <p className="text-foreground leading-relaxed">
                    {registrationData.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="col-span-1 md:col-span-2">
    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Event Schedule</h3>
    <div className="text-foreground leading-relaxed space-y-1">
      <p>
         <span className="font-medium">Starts:</span>{" "}
        {new Date(registrationData.startDate).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}{" "}
        at <span className="font-semibold">{registrationData.startTime}</span>
      </p>
      <p>
         <span className="font-medium">Ends:</span>{" "}
        {new Date(registrationData.endDate).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}{" "}
        at <span className="font-semibold">{registrationData.endTime}</span>
      </p>
    </div>
  </div>


                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Location</h3>
                    <p className="text-foreground">
                      {registrationData.location || "TBA"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Field</h3>
                    <p className="text-foreground">
                      {registrationData.field || "General"}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Please save this tracking ID for future reference and bring it with you to the event.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {!registrationData && !isSearching && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Enter your tracking ID above to view your event registration details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackRegistration;
