import Cookies from 'js-cookie';

interface uploadRes{
  statusCode: number;
  filename?:string;
  message: string;
  error?:string;
}

export const uploadImage = async (file: File): Promise<any> => {
  try {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      // 如果没有 token，返回 null 或者处理无 token 的情况
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', "avatar");

    const res = await fetch('http://localhost:5002/api/file/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to upload file');
    }

    const data:uploadRes = await res.json();

    console.log("response:", data)

    if (!res.ok) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    throw error;
  }
};