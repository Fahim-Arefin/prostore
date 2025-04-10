import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import UserDropdown from "./UserDropdown";

async function UserButton() {
  const session = await auth();
  return (
    <>
      {session?.user ? (
        <UserDropdown />
      ) : (
        <Button asChild>
          <Link href="/sign-in">
            <UserIcon /> Sign In
          </Link>
        </Button>
      )}
    </>
  );
}

export default UserButton;
