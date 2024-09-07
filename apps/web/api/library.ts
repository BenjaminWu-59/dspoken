import Cookies from 'js-cookie';

export interface Library {
  id: string,
  createdAt: string,
  updatedAt: string,
  number: number,
  hint: string,
  sentence: string,
  audioUrl: null,
  review: "0" | "1" | "2" | "3" | "4" | "5" | "7" | "15",
  status:  "pre" | "ing" | "end",
  classId: string,
  userId: string
}

export interface ResData {
  statusCode: number;
  message: string;
  error?: string;
  data?: any
}

export const getLibrary = async (): Promise<ResData> => {
  try {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      // 如果没有 token，返回 null 或者处理无 token 的情况
      throw Error("登陆权限过期，请重新登陆！")
    }

    const res = await fetch(`http://localhost:5002/api/library`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch library data');
    }

    const data: ResData = await res.json();
    return data;
  }catch(error){
    console.error('getLibrary error:', error);
    throw error;
  }
}