"use client"

import SideNav from "@/components/dashboard/SideNav";
import Topbar from "@/components/dashboard/Topbar";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <section className="h-screen flex bg-gray-500/15 ">
      <SideNav />
      <div className="flex-1">
        <Topbar />
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </section>
  );
}