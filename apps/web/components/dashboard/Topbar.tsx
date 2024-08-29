import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import { Button } from "../ui/button";
import { signout } from "@/api/auth";

const Topbar = () => {
  return (
    <div className="px-6 py-5 flex justify-end items-center">
      <p className="p-5 font-semibold">benjamin59@gmail.com</p>
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
  )
}

export default Topbar