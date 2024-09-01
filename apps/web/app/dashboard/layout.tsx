"use client"

import SideNav from "@/components/dashboard/SideNav";
import Topbar from "@/components/dashboard/Topbar";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <section className="h-screen flex bg-gray-200/10 ">
      <SideNav />
      <div className="flex-1">
        <Topbar />
        <div className="p-5 flex-grow">{children}</div>
      </div>
    </section>
  );
}