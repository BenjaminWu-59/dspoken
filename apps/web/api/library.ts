import Cookies from 'js-cookie';

export interface Library {
  id?: string,
  createdAt?: string,
  updatedAt?: string,
  number?: number,
  hint?: string,
  sentence?: string,
  audioUrl?: null,
  review?: "0" | "1" | "2" | "3" | "4" | "5" | "7" | "15",
  status?: "pre" | "ing" | "end",
  classId?: string,
}

export interface AddLibrary {
  hint: string;
  sentence: string,
  classId: string,
}

export interface ResData {
  statusCode: number;
  message: string;
  error?: string;
  data?: {
    libraries: Library[];
    totalCount: number;
    pageNo: number;
    pageSize: number
  }
}

export const getLibrary = async (queryParams: {
  id?: string;
  sentence?: string;
  status?: string;
  review?: string;
  classId?: string;
  pageNo?: number;
  pageSize?: number;
}): Promise<ResData> => {
  try {
    const accessToken = Cookies.get('access_token');
    if (!accessToken) throw Error("登陆权限过期，请重新登陆！");

    // 使用 URLSearchParams 构建查询字符串
    const params = new URLSearchParams({
      ...(queryParams.sentence != null && { sentence: queryParams.sentence.toString() }),
      ...(queryParams.pageNo != null && { pageNo: queryParams.pageNo.toString() }),
      ...(queryParams.pageSize != null && { pageSize: queryParams.pageSize.toString() }),
    }).toString();
    
    const res = await fetch(`http://localhost:5002/api/library?${params}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    if (!res.ok) throw res;

    return await res.json();
  } catch (error) {
    console.error('getLibrary error:', error);
    throw error;
  }
}

export const addLibrary = async (libraryData: Partial<AddLibrary>): Promise<ResData> => {
  try {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      throw Error("登录权限过期，请重新登录！")
    }

    const res = await fetch(`http://localhost:5002/api/library`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(libraryData),
    });

    if (!res.ok) {
      throw res;
    }

    const data: ResData = await res.json();
    return data;
  } catch (error) {
    console.error('addLibrary error:', error);
    throw error;
  }
}