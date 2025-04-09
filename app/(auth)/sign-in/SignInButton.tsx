"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full" variant="default">
      {pending ? "Sign in ..." : "Sign In with credentials"}
    </Button>
  );
}

export default SignInButton;
