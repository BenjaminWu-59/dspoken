import Cookies from 'js-cookie';

export interface User {
  name: string;
  email: string;
  firstName?: string;
  lastName?:  string;
  nickname?: string;
  phone?: string;
  gender?: string;
  age?: number | null;
  avatar?: string;
}

export const getUser = async (): Promise<User | null> => {
  try {
    const accessToken = Cookies.get('access_token');

    if (!accessToken) {
      // 如果没有 token，返回 null 或者处理无 token 的情况
      return null;
    }

    const res = await fetch(`http://localhost:5002/api/users/me`, {
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