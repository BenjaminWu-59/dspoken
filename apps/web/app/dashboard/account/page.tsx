'use client'
import AccountInfo from "@/components/dashboard/AccountInfo";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { getUser, User } from '@/api/user';
import { useEffect, useState } from "react";
import UploadImage from "@/components/UploadImage"
import Image from "next/image";
import { Button } from "@/components/ui/button";



export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <section className="flex">

      <Card className="w-[35%] h-[300px] flex flex-col justify-center items-center">
        <div className="w-36 h-36 relative flex justify-center items-center rounded-full group overflow-hidden">
          {/* 用户头像图片 */}
          <Image
            src="/avatar.png"
            alt="avatar"
            fill
            className="object-cover rounded-full"
            priority
          />

          {/* Hover 时显示 UploadImage 组件 */}
          <div className="absolute inset-0 flex justify-center items-center opacity-0 
                          group-hover:opacity-100 transition-opacity">
            <UploadImage
              className="w-full h-full flex justify-center items-center"
              onUpload={(e) => console.log(e)}
            />
          </div>
        </div>
        <p className="py-2 text-center text-xl font-bold">
          {user?.name || ''}
        </p>
      </Card>


      <div className="flex-grow ml-4 space-y-6">
        <Card>
          <AccountInfo user={user} />
        </Card>

        <Card>
          <CardContent>
            充值信息
          </CardContent>
        </Card>
      </div>
    </section>
  )
}