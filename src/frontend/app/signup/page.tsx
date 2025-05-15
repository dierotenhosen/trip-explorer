import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Sign Up - Travelogue",
  description: "Create a new Travelogue account to start your journey.",
};

export default function SignUpPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Join Travelogue
          </h1>
          <p className="text-sm text-muted-foreground">
            Create an account to start your travel journey
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
} 