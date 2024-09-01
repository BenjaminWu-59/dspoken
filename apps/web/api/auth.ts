// utils/auth.ts
import Cookies from 'js-cookie';
import { User } from './user';

export interface signinRes {
  access_token: string;
  message: string;
  statusCode: string;
  // 其他可能的响应字段...
}


export const signin = async (username: string, password: string): Promise<void> => {
  try {
    const res = await fetch(`http://localhost:5002/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailOrName: username, password: password }),
    });

    const data: signinRes = await res.json();

    if (!res.ok) {
      throw new Error(data.message)
    }

    // 假设服务器返回的响应中包含 authToken
    Cookies.set('access_token', data.access_token, { expires: 7 });
  } catch (error) {
    throw error;
  }
};

export const signup = async (data: User): Promise<void> => {
  try {
     const res = await fetch(`http://localhost:5002/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data.name,email: data.email, password: data.password }),
    });

    const resData: signinRes = await res.json();

    if (!res.ok) {
      throw new Error(resData.message)
    }

    // 假设服务器返回的响应中包含 authToken
    Cookies.set('access_token', resData.access_token, { expires: 7 });
  } catch (error) {
    throw error;
  }
}

export const signout = async () => {
  // 清除 token
  Cookies.remove('access_token');

  window.location.href = '/';
};
