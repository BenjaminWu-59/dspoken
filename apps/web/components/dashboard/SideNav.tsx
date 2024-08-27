import Link from "next/link"
import Image from "next/image";

interface DashRoute {
  name: string;
  href: string;
}

const defaultDashRoute: DashRoute[] = [
  {
    name: "Library",
    href: "/dashboard/library"
  },
  {
    name: "Speaking",
    href: "/dashboard/speaking"
  },
  {
    name: "Account",
    href: "/dashboard/account"
  },
  {
    name: "Settings",
    href: "/dashboard/settings"
  }
]

const SideNav = () => {
  return (
    <nav className="flex flex-col w-[240px] h-full border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
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
                className="my-5"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default SideNav