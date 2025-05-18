"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Loader2, LogOut, UserX } from "lucide-react";
import { deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Get current time for greeting
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }
  
  // Format last sign-in time if available
  const lastSignInTime = user?.metadata?.lastSignInTime 
    ? new Date(user.metadata.lastSignInTime).toLocaleString() 
    : "Unknown";
  
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/signin");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      await deleteUser(user);
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. You may need to re-authenticate.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Welcome Card */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              {greeting}, {user?.displayName || "User"}!
            </CardTitle>
            <CardDescription>
              Welcome to your personalized dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Last login: {lastSignInTime}
              </p>
              <p className="text-sm text-muted-foreground">
                Email: {user?.email}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Management */}
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="justify-start">
                    <UserX className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete Account"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
        
        {/* Content Placeholder - Add actual dashboard content here */}
        <Card className="col-span-full md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Trips</CardTitle>
            <CardDescription>
              View and manage your saved trips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              No trips saved yet. Start exploring to add trips to your collection!
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/explore")}>
              Explore Destinations
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 