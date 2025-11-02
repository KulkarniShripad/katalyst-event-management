/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import InterestedModal from "@/components/InterestedModal";
import RegisterModal from "@/components/RegisterModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Search, Ticket } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mock data - In real app, this would come from API
// const mockEvents = [
//   {
//     id: 1,
//     title: "Women in AI Workshop",
//     description: "Learn about artificial intelligence and machine learning. Hands-on coding sessions with industry experts.",
//     location: "Tech Hub, Bangalore",
//     start: "2025-11-15T10:00:00",
//     end: "2025-11-15T17:00:00",
//     field: "Computer Science",
//     year: 2,
//     status: "Upcoming",
//   },
//   {
//     id: 2,
//     title: "Robotics & Innovation Summit",
//     description: "Build your own robot and learn about automation. Exciting challenges and team competitions.",
//     location: "Innovation Center, Mumbai",
//     start: "2025-11-20T09:00:00",
//     end: "2025-11-20T18:00:00",
//     field: "Engineering",
//     year: 3,
//     status: "Upcoming",
//   },
//   {
//     id: 3,
//     title: "Data Science Bootcamp",
//     description: "Master data analysis, visualization, and predictive modeling. Real-world projects included.",
//     location: "Virtual Event",
//     start: "2025-11-25T14:00:00",
//     end: "2025-11-27T18:00:00",
//     field: "Mathematics",
//     year: 1,
//     status: "Upcoming",
//   },
// ];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [interestedModal, setInterestedModal] = useState<{ open: boolean; event: any }>({
    open: false,
    event: null,
  });
  const [registerModal, setRegisterModal] = useState<{ open: boolean; event: any }>({
    open: false,
    event: null,
  });
  const [mockEvents, setMockEvents] = useState([]);

  useEffect( () => {
    const fetchEvents = async () => {
      try { 
        const response = await axios.get('http://localhost:5000/api/student/getAllEvents');
        setMockEvents(response.data);
        console.log("Fetched events:", response.data);
      }catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesField = fieldFilter === "all" || event.field === fieldFilter;
    return matchesSearch && matchesField;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm text-primary-foreground font-medium">Empowering Youth</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Discover Your Future in
              <span className="block mt-2">Technology & Innovation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Join Katalyst's outreach programs designed to inspire and support youngsters to pursue their dreams in Science, Technology, Engineering, Mathematics and many more fields.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="gradient" className="text-base shadow-glow">
                Explore Events
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
                onClick={() => navigate('/track')}
              >
                <Ticket className="w-5 h-5 mr-2" />
                Track Registration
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming <span className="bg-gradient-primary bg-clip-text text-transparent">Events</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our exciting lineup of workshops, bootcamps, and summits designed to enhance your skills and network.
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={fieldFilter} onValueChange={setFieldFilter}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filter by field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fields</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onInterested={() => setInterestedModal({ open: true, event })}
                onRegister={() => setRegisterModal({ open: true, event })}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      {interestedModal.event && (
        <InterestedModal
          open={interestedModal.open}
          onOpenChange={(open) => setInterestedModal({ open, event: null })}
          eventTitle={interestedModal.event.title}
          eventId={interestedModal.event.id}
        />
      )}

      {registerModal.event && (
        <RegisterModal
          open={registerModal.open}
          onOpenChange={(open) => setRegisterModal({ open, event: null })}
          eventTitle={registerModal.event.title}
          eventId={registerModal.event.id}
        />
      )}
    </div>
  );
};

export default Index;
