import Link from "next/link"

const SideNav = () =>{
  return (
    <nav className="h-full flex flex-col border border-red-500">
      <Link href="/dashboard/account">Account</Link>
      <Link href="/dashboard/library">Library</Link>
      <Link href="/dashboard/speaking">Speaking</Link>
    </nav>
  )
}

export default SideNav