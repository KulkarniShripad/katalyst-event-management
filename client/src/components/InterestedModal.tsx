import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

interface InterestedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  eventId: number;
}

const InterestedModal = ({ open, onOpenChange, eventTitle, eventId }: InterestedModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/student/addLead", {name, email, eventId});
      if (response.status == 201) {
        toast.success("Your interest has been recorded! We'll keep you updated.");
      } else {
        toast.error("Failed to submit your interest. Please try again." + response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again." + error);
      return;
      
    } finally{
      setName("");
      setEmail("");
      onOpenChange(false);
    setLoading(false);
    }
    
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Express Interest</DialogTitle>
          <DialogDescription>
            Show your interest in <span className="font-semibold text-primary">{eventTitle}</span>. We'll send you updates and reminders.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={loading}>
              {loading ? "Submitting..." : "Submit Interest"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InterestedModal;
