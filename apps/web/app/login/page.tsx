"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signin } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"


const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 8 characters.",
  }),
})

const Login = () => {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("提交的数据：", data)
    try {
      await signin(data.username, data.password);

      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error("登录失败：", error.message); 
      
      return toast({
        variant: "destructive",
        title: error.message,
        duration: 1500
      })
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={`/login-bg.png`}
            alt="Login Background"
            className="object-cover"
            fill
            priority
          />
        </div>
      </div>
      {/* bg-black text-slate-100 */}
      <div className="w-[40%] pt-60 flex flex-col items-center">
        <div className="flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="JS"
            className="rounded bg-background"
            width={50}
            height={50}
            priority
          />
          <span className="pl-3 text-5xl font-zain font-extrabold text-foreground/90">Daily Spoken</span>
        </div>

        {/* 使用 shadcn 的 Form 组件创建登录表单 */}

        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-20 w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email or UserName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Log in</Button>
          </form>
        </Form>


        <p className="py-10 w-full font-bold text-center">
          Don’t you have an account? &nbsp;
          <strong>Sign up</strong>
        </p>

      </div>
    </div>
  );
};

export default Login;