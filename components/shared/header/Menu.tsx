import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import UserButton from "./UserButton";

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
        {/* <Button asChild>
          <Link href="/sign-in">
            <UserIcon /> Sign In
          </Link>
        </Button> */}
        <UserButton />
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
            {/* <Button asChild>
              <Link href="/sign-in">
                <UserIcon /> Sign In
              </Link>
            </Button> */}
            <UserButton />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default Menu;
