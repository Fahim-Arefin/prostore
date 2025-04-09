"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/userAcrion";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import SignInButton from "./SignInButton";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  console.log("client", callbackUrl);
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signInDefaultValues.password}
            autoComplete="current-password"
          />
        </div>
        <div>
          <SignInButton />
        </div>

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link target="_self" className="link" href="/sign-up">
            Sign Up
          </Link>
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
