'use client'
import AccountInfo from "@/components/dashboard/AccountInfo";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getUser, User, editUser } from '@/api/user';
import { useEffect, useState } from "react";
import UploadImage from "@/components/UploadImage"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";


export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);


  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const onSubmit = async (url: string) => {
    try {
      const res = await editUser({
        avatar: url
      });
      console.log("返回结果：", res)
      window.location.reload()
    } catch (error: any) {
      return toast({
        variant: "destructive",
        title: error.message,
        duration: 1500
      })
    }
  };

  const handleImageUpload = (url: string) => {
    console.log(111111)
    setAvatarUrl(url);
    setIsDialogOpen(true);  // 上传成功后立即打开弹窗
  };

  return (
    <section className="flex">

      <Card className="w-[35%] h-[230px] p-8 flex flex-col items-center">
        <div className="w-36 h-36 relative flex justify-center items-center rounded-full group overflow-hidden">
          <img
            src={user?.avatar || "/avatar.png"}
            alt="avatar"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute inset-0 flex justify-center items-center opacity-0 
                          group-hover:opacity-100 transition-opacity">
            <UploadImage
              className="w-full h-full flex justify-center items-center"
              onUpload={async (e) => handleImageUpload(e)}
            />
          </div>
        </div>
        <p className="py-2 text-center text-xl font-bold">
          {user?.name || ''}
        </p>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="hidden">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>头像预览</DialogTitle>
            <DialogDescription>
              {avatarUrl && <img src={avatarUrl} alt="Uploaded Image" />}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => onSubmit(avatarUrl)}
              >
                确认
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>


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