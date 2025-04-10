"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/userAcrion";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import SignUpButton from "./SignUpButton";

const CredentialsSignUpForm = () => {
  const [data, action] = useActionState(signUp, {
    message: "",
    success: false,
    fieldErrors: {} as Record<string, string[]>,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            // required
            type="text"
            defaultValue={signUpDefaultValues.name}
            autoComplete="name"
          />
          {data.fieldErrors?.name?.[0] && (
            <p className="text-sm text-destructive">
              {data.fieldErrors.name[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            // required
            type="email"
            defaultValue={signUpDefaultValues.email}
            autoComplete="email"
          />
          {data.fieldErrors?.email?.[0] && (
            <p className="text-sm text-destructive">
              {data.fieldErrors.email[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            // required
            type="password"
            defaultValue={signUpDefaultValues.password}
            autoComplete="current-password"
          />
          {data.fieldErrors?.password?.[0] && (
            <p className="text-sm text-destructive">
              {data.fieldErrors.password[0]}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            // required
            type="password"
            defaultValue={signUpDefaultValues.confirmPassword}
            autoComplete="current-password"
          />
          {data.fieldErrors?.confirmPassword?.[0] && (
            <p className="text-sm text-destructive">
              {data.fieldErrors.confirmPassword[0]}
            </p>
          )}
        </div>
        <div>
          <SignUpButton />
        </div>

        {!data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            target="_self"
            className="link"
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignUpForm;
