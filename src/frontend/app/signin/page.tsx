import { SignInForm } from "@/components/auth/SignInForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Sign In - Travelogue",
  description: "Sign in to your Travelogue account to manage your trips and experiences.",
};

export default function SignInPage({
  searchParams,
}: {
  searchParams: { registered?: string };
}) {
  const registered = searchParams.registered === "true";

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        
        {registered && (
          <Alert className="border-green-500 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Account created successfully! You can now sign in with your credentials.
            </AlertDescription>
          </Alert>
        )}
        
        <SignInForm />
      </div>
    </div>
  );
} 