import { useState, ChangeEvent, ReactNode, useRef } from 'react';
import { uploadImage } from '@/api/upload';
import Image from "next/image";
import { toast } from '@/components/ui/use-toast';

interface UploadImageProps {
  onUpload: (avatarUrl: string) => void;
  className?: string;
}
export default function UploadImage({ onUpload, className = "" }: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      try {
        const res = await uploadImage(file);
        console.log("返回结果：", res)
        
        onUpload(res.filename ? res.filename : "");
      } catch (error: any) {
        return toast({
          variant: "destructive",
          title: "文件上传失败：" + error.message,
          duration: 1500
        })
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`${className} w-full h-full relative overflow-hidden
                  group hover:transform transition-transform duration-300`
      }
      onClick={handleImageClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="absolute w-full h-full flex justify-center items-center">
        <Image
          src="/upload-dark.svg"
          alt="upload"
          width={30}
          height={30}
          objectFit="cover"
        />
      </div>
      <div className="absolute opacity-0 flex justify-center items-center
                 group-hover:top-[0] p-5 w-full h-full
                 group-hover:opacity-100 bg-black/60
                 group-hover:backdrop-blur-sm duration-500"
      >
        <Image
          src="/upload-light.svg"
          alt="upload"
          width={30}
          height={30}
          objectFit="cover"
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>

  );
}