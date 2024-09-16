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
    <nav className="flex flex-col w-max-[350px] h-full border-r border-gray-300/45">
      <div className="p-10">
        <Link href="/" className="mr-2 flex items-center space-x-1">
          <Image
            src="/logo.png"
            alt="JS"
            className="rounded bg-background"
            width={30}
            height={30}
            priority
          />
          <span className="pl-1 text-4xl font-zain font-extrabold text-foreground/80">Daily Store</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center">
        <section className="px-4 space-y-12">
          {defaultDashRoute.map((item, index) => (
            <Link key={item.name}
              href={item.href}
              className={`my-5 px-3 flex items-center space-x-4 rounded-xl
                  ${pathname === item.href ? "text-lg font-semibold" : "border border-white/0"}
                `}
            >
              <Image
                src={`/nav/${item.icon}.svg`}
                alt=""
                width={20}
                height={20}
                priority
              />
              <p>{item.name}</p>
            </Link>
          ))}
        </section>

        <section className="pt-56">
          <hr />
          <div className="flex flex-col justify-center items-center px-10 py-5 space-y-5">
            <p className="text-stone-500">Subscriber，Remaining time:</p>
            <div className="flex items-center">
              <div className="m-2 flex border border-gray-400/60 rounded text-lg">
                <p className="w-18 p-5 text-center border-r border-gray-400/60">9</p>
                <p className="w-18 p-5 text-center border-r border-gray-400/60">9</p>
                <p className="w-18 p-5 text-center">9</p>
              </div>
              Day
            </div>

            <div className="text-stone-500">
              End at：2027-12-1 18:30:40
            </div>
          </div>
        </section>
      </div>
    </nav>
  )
}

export default SideNav