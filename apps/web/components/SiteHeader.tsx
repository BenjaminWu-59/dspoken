"use client"
import TopNav from "./TopNav";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { signout } from "@/api/auth";
import { getUser, User } from '@/api/user';
import { useEffect, useState } from "react";



const SiteHeader = () => {

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);


  return (
    <header className="z-20 top-0 w-full px-2 py-5 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-3xl items-center">
        <TopNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <Link href="/dashboard/speaking" passHref>
              <Button className="mr-4">Start Speaking</Button>
            </Link>
          ) : (<></>)}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center">
                  <Image
                    src="/avatar.png"
                    alt="avatar"
                    className="rounded-full"
                    width={50}
                    height={50}
                    priority
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2 flex flex-col justify-center items-center">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <div className="w-full flex flex-col">
                  <hr className="border-t-1 border-gray-300 py-3" />
                  <Button className="bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-700"
                    onClick={() => signout()}
                  >
                    Sign Out
                  </Button>
                </div>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" passHref>
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;