import Link from "next/link"
import Image from "next/image";
import { usePathname } from "next/navigation";


interface DashRoute {
  name: string;
  href: string;
  icon: string;
}

const defaultDashRoute: DashRoute[] = [
  {
    name: "Library",
    href: "/dashboard/library",
    icon: "library"
  },
  {
    name: "Speaking",
    href: "/dashboard/speaking",
    icon: "speak"
  },
  {
    name: "Account",
    href: "/dashboard/account",
    icon: "profile"
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "setting"
  }
]

const SideNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-1/4 h-full border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="p-10">
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
      </div>
      <div className="px-10 flex flex-col justify-center">
        {defaultDashRoute.map((item, index) => (
          <Link key={item.name}
            href={item.href}
            className={`my-5 px-3 py-2 flex items-center space-x-4 rounded-xl 
                  ${pathname === item.href ? "bg-neutral-500/30" : ""}
                `}
          >
            <Image
              src={`/nav/${item.icon}.svg`}
              alt=""
              width={20}
              height={20}
              priority
            />
            <p className="text-lg">{item.name}</p>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default SideNav