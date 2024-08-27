"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TopNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center space-x-4 lg:space-x-6">
      <Link href="/" className="mr-2 flex items-center justify-center space-x-1">
        <Image
          src="/logo.png"
          alt="JS"
          className="rounded bg-background"
          width={30}
          height={30}
          priority
        />
        <span className="pl-1 text-4xl font-zain font-extrabold text-foreground/80">Daily Spoken</span>
      </Link>
      <Link
        href="/"
        className={cn(
          "text-lg font-medium transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about" ? "text-foreground" : "text-foreground/60"
        )}
      >
        About
      </Link>
    </nav>
  );
}

export default TopNav