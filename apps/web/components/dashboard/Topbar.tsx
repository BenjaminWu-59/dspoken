import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { signout } from "@/api/auth";
import { getUser, User } from '@/api/user';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

const Topbar = () => {
  const pathname:string = usePathname().split('/').pop() || ""

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <div className="px-8 py-5 flex justify-between items-center">
      <p className="text-2xl font-bold">
        {pathname?.charAt(0).toUpperCase() + pathname?.slice(1)}
      </p>
      <div className="flex">
        <p className="p-5 font-semibold">{user?.email}</p>
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
          <DropdownMenuContent align="end" className="flex flex-col justify-center items-center">
            <div className="w-full p-5 flex flex-col">
              <DropdownMenuItem >
                Account
              </DropdownMenuItem>
              <DropdownMenuItem >
                Settings
              </DropdownMenuItem>

              <Button className="my-2 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-700"
                onClick={() => signout()}
              >
                Sign Out
              </Button>
            </div>

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Topbar