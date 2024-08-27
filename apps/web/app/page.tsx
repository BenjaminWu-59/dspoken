"use client"
import GlobalSearch from "@/components/GlobalSearch";
import SiteHeader from "@/components/SiteHeader";
import { getUser, User } from '@/api/user';
import { useEffect, useState } from "react";


export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <>
      <SiteHeader  user={user}/>
      <section className="px-40 py-20">
        <p className="inline-block text-4xl font-medium pb-1 px-1 rounded-lg  gredientBlue text-black dark:text-white">
          Nothing.
        </p>
        <div className="flex">
          <GlobalSearch />
        </div>
      </section>

      <section>

      </section>
    </>
  );
}