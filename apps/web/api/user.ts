import Cookies from 'js-cookie';

export interface User {
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  age?: number | null;
  avatar?: string;
  password?: string
}

export const getUser = async (): Promise<User | null> => {
  try {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      // 如果没有 token，返回 null 或者处理无 token 的情况
      return null;
    }

    const res = await fetch(`http://localhost:5002/api/user/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data: User = await res.json();
    return data;
  } catch (error) {
    console.error('getUser error:', error);
    return null;
  }
};

export const editUser = async (userData: Partial<User>): Promise<User | null> => {
  try {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      // 如果没有 token，返回 null 或者处理无 token 的情况
      return null;
    }

    const res = await fetch(`http://localhost:5002/api/user`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',  // 确保内容类型是 JSON
      },
      body: JSON.stringify(userData),  // 将要更新的用户数据作为 JSON 字符串发送
    });

    if (!res.ok) {
      throw new Error('Failed to update user data');
    }

    const data: User = await res.json();
    return data;
  } catch (error) {
    console.error('editUser error:', error);
    return null;
  }
};