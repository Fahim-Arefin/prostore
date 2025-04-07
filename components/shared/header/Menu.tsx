import React from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Menu() {
  return (
    <div className="flex justify-end gap-3">
      {/* for tab or desktop version */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button variant="ghost" asChild>
          <Link href="/cart">
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <Button asChild>
          <Link href="/sign-in">
            <UserIcon /> Sign In
          </Link>
        </Button>
      </nav>
      {/* for mobile version */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start p-5">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
            <ModeToggle />
            <Button variant="ghost" asChild>
              <Link href="/cart">
                <ShoppingCart /> Cart
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">
                <UserIcon /> Sign In
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default Menu;
