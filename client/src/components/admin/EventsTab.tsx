/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EventFormDialog from "./EventFormDialog";
import { toast } from "sonner";
import axios from "axios";

const EventsTab = () => {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null); 

  useEffect( () => {
    const fetchEvents = async () => {
      try { 
        const response = await axios.get('http://localhost:5000/api/admin/getAllEvents');
        setEvents(response.data);
        console.log("Fetched events:", response.data);
      }catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setDialogOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== eventId));
      toast.success("Event deleted successfully");
    }
  };

  const handleSaveEvent = (eventData: any) => {
    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...eventData, id: e.id } : e));
      toast.success("Event updated successfully");
    } else {
      const newEvent = { ...eventData, id: events.length + 1 };
      setEvents([...events, newEvent]);
      toast.success("Event created successfully");
    }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Manage Events</h2>
          <p className="text-muted-foreground">Create, edit, and manage your outreach events</p>
        </div>
        <Button onClick={handleCreateEvent} variant="gradient">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-card transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {event.title}
                    <Badge variant={event.status === "Upcoming" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">{event.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditEvent(event)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Field</p>
                  <p className="font-medium">{event.field}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Target Year</p>
                  <p className="font-medium">Year {event.year}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Starts at</p>
                  <p className="font-medium">
                    {event.startDate} {event.startTime}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Starts at</p>
                  <p className="font-medium">
                    {event.startDate} {event.startTime}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EventFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        event={editingEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default EventsTab;
