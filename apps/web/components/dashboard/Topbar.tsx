import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signout } from "@/api/auth";
import { getUser, User } from '@/api/user';
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Topbar = () => {
  const router = useRouter();
  const pathname: string = usePathname().split('/').pop() || ""

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <div className="px-8 py-5 flex justify-between items-center border-b border-gray-300/45">
      <p className="text-2xl font-bold">
        {pathname?.charAt(0).toUpperCase() + pathname?.slice(1)}
      </p>
      <div className="flex">
        
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
              <DropdownMenuItem>
                VIP
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signout()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

// onClick={() => signout()

export default Topbar