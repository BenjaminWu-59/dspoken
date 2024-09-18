"use client"

import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';


export default function Home() {
  const [href, setHref] = useState("")

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      setHref("/dashboard/library"); 
    } else {
      setHref("/login")  
    }
  }, []);

  return (
    <>
      <SiteHeader />
      <section className="px-40 py-40 flex justify-center items-center space-x-16">
        <div>
          <p className="inline-block text-4xl font-medium pb-1 rounded-lg gredientBlue text-black dark:text-white">
            Daily Store 记录你的碎片知识
          </p>
          <p className="py-3 text-xl text-gray-500/80">
            你可以记录英语短句、面试题、专业术语及其解释，或者其他零散、短小的碎片化知识。
          </p>
          <div className="py-4">
            <Link href={href} passHref>
              <Button className="p-6 text-xl">Get Started</Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="/homeLogo.png"
            alt="avatar"
            className="max-w-[350px] max-h-[350px] rounded-[50%] object-cover"
          />
        </div>
      </section>
    </>
  );
}