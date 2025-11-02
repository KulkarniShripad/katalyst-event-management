import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    // Simulate API call - In real app, this would validate credentials
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        toast.success("Login successful!");
        // Store auth token in localStorage
        localStorage.setItem("adminAuth", "true");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-background/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 group-hover:bg-background/20 transition-all duration-300">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">
            Katalyst
          </span>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-card-hover">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow mb-2">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            
            <p className="text-sm text-center text-muted-foreground">
              For demo: username: <span className="font-mono font-semibold">admin</span>, password: <span className="font-mono font-semibold">admin</span>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
