'use client'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { User, editUser } from "@/api/user"
import { useEffect, useState } from "react"
import * as React from "react";
import { useToast } from "@/components/ui/use-toast"

const defaultUserData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  age: null,
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().optional(),
  gender: z.string().optional(),
  age: z.number().nullable().optional(),
})

interface AccountInfoProps {
  user: User | null;
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  const { toast } = useToast()
  const [isEdit, setIsEdit] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultUserData
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        age: user.age || null,
      });
    }
  }, [user, form]);

  const handleCancel = () => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        age: user.age || null,
      });
    }
    setIsEdit(false); // 关闭编辑模式
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await editUser(data); // 将表单数据传递给 editUser
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

  return (
    <div className="px-10 pt-4 pb-12  flex justify-left">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-3/5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-[25%] text-nowrap text-base">姓名</FormLabel>
                <FormControl>
                  <Input disabled={!isEdit} placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-[25%] text-nowrap text-base">邮箱</FormLabel>
                <FormControl>
                  <Input disabled={!isEdit} type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="w-[25%] text-nowrap text-base">电话</FormLabel>
                <FormControl>
                  <Input disabled={!isEdit} placeholder="phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-[25%] text-nowrap text-base">性别</FormLabel>
                <FormControl>
                  <Select disabled={!isEdit} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger ref={field.ref} className="w-[180px]">
                      <SelectValue placeholder="male or female" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">male</SelectItem>
                      <SelectItem value="female">female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-[25%] text-nowrap text-base">年龄</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="age"
                    disabled={!isEdit}
                    value={field.value ?? ""} // Convert null to empty string
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            isEdit ? (<div className="flex space-x-7">
              <Button type="submit" className="px-10 custom-button">确认</Button>
              <Button className="px-10"
                onClick={handleCancel}
              >
                取消
              </Button>
            </div>) : (
              <Button className="px-10 custom-button"
                onClick={() => setIsEdit(true)}
              >
                编辑
              </Button>
            )
          }
        </form>
      </Form>
    </div>
  );
};

export default AccountInfo;