"use client"

import SideNav from "@/components/dashboard/SideNav";
import SiteHeader from "@/components/SiteHeader";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen">
       <SiteHeader />
      <section className="flex">
        <SideNav />
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </section>
    </div>
  );
}