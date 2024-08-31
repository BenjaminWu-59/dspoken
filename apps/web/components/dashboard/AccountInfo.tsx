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
import { Input } from "@/components/ui/input"
import { User, editUser } from "@/api/user"
import { useEffect } from "react"

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

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const updatedUser = await editUser(data); // 将表单数据传递给 editUser
      console.log(updatedUser)

    } catch (error) {

    }
  };

  return (
    <div className="px-5 py-10 flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-3/5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormLabel className="w-[22%] text-nowrap text-base">用户名称</FormLabel>
                <FormControl>
                  <Input placeholder="用户名称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex items-center ">
                <FormLabel className="w-[22%] text-nowrap text-base">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex items-center ">
                <FormLabel className="w-[22%] text-nowrap text-base">电话</FormLabel>
                <FormControl>
                  <Input placeholder="电话" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex items-center ">
                <FormLabel className="w-[22%] text-nowrap text-base">性别</FormLabel>
                <FormControl>
                  <Input placeholder="性别" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex items-center ">
                <FormLabel className="w-[22%] text-nowrap text-base">年龄</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="年龄"
                    value={field.value ?? ""} // Convert null to empty string
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">保存</Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountInfo;