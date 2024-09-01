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
  FormLabel,
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
import { signin, signup } from '@/api/auth';
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react";


const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 8 characters.",
  }),
})

const signUpFormSchema = z.object({
  name: z.string()
    .min(4, { message: "用户名至少4个字符！" })
    .regex(/^\S*$/, { message: "用户名不得包含空格！" }),

  password: z.string()
    .min(8, { message: "密码至少八个字母！" })
    .regex(/^\S*$/, { message: "密码不得包含空格！" }),

  passwordVerify: z.string()
    .min(8, { message: "密码至少八个字母！" })
    .regex(/^\S*$/, { message: "密码不得包含空格！" }),

  email: z.string()
    .email({ message: "邮箱格式不正确！" })
    .regex(/^\S*$/, { message: "邮箱不得包含空格！" }),
}).refine((data) => data.password === data.passwordVerify, {
  path: ['passwordVerify'],
  message: '密码和确认密码必须一致！',
});

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

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordVerify: ""
    },
  })

  useEffect(() => {
    if (!isSignUpOpen) {
      signUpForm.reset({
        name: "",
        email: "",
        password: "",
        passwordVerify: ""
      });
    }
  }, [isSignUpOpen])


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

  const signUpSubmit = async (data: z.infer<typeof signUpFormSchema>) => {
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password
      });
      setIsSignUpOpen(false)
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
            onClick={() => setIsSignUpOpen(true)}
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
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(signUpSubmit)} className="p-3 space-y-3">
                <FormField
                  control={signUpForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名称</FormLabel>
                      <FormControl>
                        <Input placeholder="输入名称" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="w-[25%] text-nowrap text-base">邮箱</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="输入邮箱" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="输入密码" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="passwordVerify"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>再次输入密码</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="再次输入密码" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="py-3">
                  <Button type="submit" className="px-10">确认</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default Login;