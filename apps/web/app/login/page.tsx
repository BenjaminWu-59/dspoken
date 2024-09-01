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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { signin } from '@/api/auth';
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";


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
  const [isSignUpOpen, setIsSignUpOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  })


  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await signin(data.username, data.password);

      window.location.href = '/dashboard';
    } catch (error: any) {
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


        <div className="py-10 flex justify-center items-center w-full font-bold text-center">
          <p>Don’t you have an account? </p>
          <Button 
               variant="link"
               className="text-lg font-extrabold"
               onClick={()=>setIsSignUpOpen(true)}
          >
            Sign up
          </Button>

        </div>

        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>欢迎注册</DialogTitle>
              <DialogDescription>
                 由于学习需要，后续界面将以英文为主哦～
              </DialogDescription>
            </DialogHeader>
          
            <DialogFooter>
              <Button type="submit" className="px-5">确认</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default Login;