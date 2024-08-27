import Link from "next/link"

const SideNav = () =>{
  return (
    <nav className="w-full flex-none md:w-64 h-full flex flex-col">
      <Link href="/dashboard/account">Account</Link>
      <Link href="/dashboard/library">Library</Link>
      <Link href="/dashboard/speaking">Speaking</Link>
    </nav>
  )
}

export default SideNav