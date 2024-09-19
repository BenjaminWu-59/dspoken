"use client"
import TopNav from "./TopNav";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { signout } from "@/api/auth";
import { getUser, User } from '@/api/user';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';




const SiteHeader = () => {
  const router = useRouter();
  
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
      <div className="p-10 flex justify-between h-14">
        <TopNav />
        <div className="flex justify-end items-center">
          {user ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-16 h-16 flex justify-center items-center">
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mr-3">
              <DropdownMenuLabel>
                 <p className="text-base">{user?.name}</p>
                 <p className="text-gray-500">{user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push('/dashboard/account')}>
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signout()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : (
            <Link href="/login" passHref>
              <Button variant="outline">登陆</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;