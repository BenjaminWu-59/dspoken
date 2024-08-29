import AccountInfo from "@/components/dashboard/AccountInfo";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image";


export default function Page() {

  return (
    <section className="flex">

      <Card className="w-[35%] h-72 py-5 flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <Image
            src="/avatar.png"
            alt="avatar"
            className="rounded-full"
            width={80}
            height={80}
            priority
          />
        </div>
        <p className="py-2 text-center text-xl font-bold">
          benjamin59@gmail.com
        </p>
      </Card>


      <div className="flex-grow ml-4 space-y-6">
        <Card>
          <AccountInfo />
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