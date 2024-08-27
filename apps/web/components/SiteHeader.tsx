import TopNav from "./TopNav";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { User } from '@/api/user';
import { signout } from "@/api/auth";


interface SiteHeaderProps {
  user: User | null;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ user }) => {
  return (
    <header className="z-20 top-0 w-full px-3 py-5 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-3xl items-center">
        <TopNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center px-0 border-none">
                  <Image
                    src="/default-avatar.png"
                    alt="avatar"
                    className="rounded-3xl bg-background"
                    width={40}
                    height={40}
                    priority
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2 flex flex-col justify-center items-center">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <div className="w-full flex flex-col">
                  <hr className="border-t-1 border-gray-300 py-3"/>
                  <Button className="bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-700"
                          onClick={() =>signout()}
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