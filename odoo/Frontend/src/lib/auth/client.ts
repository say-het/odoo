'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic?: File;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const formData = new FormData();
    formData.append('name', `${params.firstName} ${params.lastName}`);
    formData.append('email', params.email);
    formData.append('password', params.password);

    // if (params.profilePic) {
    //   formData.append('profilePic', params.profilePic);
    // }

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || 'Registration failed' };
      }

      // Simulate login by storing a fake token
      const token = generateToken();
      localStorage.setItem('custom-auth-token', token);
      localStorage.setItem('userId', data.user._id);

      return {};
    } catch (err) {
      return { error: 'Network error' };
    }
  }
async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
  const { email, password } = params;

  try {
    const response = await fetch('http://localhost:5000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include', 
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return { error: data.message || 'Login failed' };
    }

    // Optional: Store info if needed for frontend use
    localStorage.setItem('custom-auth-token', 'session'); // just a placeholder if you want
    localStorage.setItem('userId', data.user._id); // just a placeholder if you want

    return {};
  } catch (err) {
    return { error: 'Network error' };
  }
}


  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
}

export const authClient = new AuthClient();
