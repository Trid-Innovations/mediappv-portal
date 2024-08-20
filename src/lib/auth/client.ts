'use client';

import type { User } from '@/types/user';

import { createSession, fetchSession, logout, requestValidateSession } from './session-client';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
  async signUp(_: SignUpParams): Promise<{ error?: string }> {
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);
    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  //should be create session
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;
    try {
      const response = await createSession({ username: email, password });
      const sessionToken = response.data?.sessionToken;
      await requestValidateSession(sessionToken);
      const returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        const fullReturnUrl = `${returnUrl}?requestedForPayment=true`;
        const urlObj = new URL(fullReturnUrl);

        const path = urlObj.toString();
        window.location.href = path;

        localStorage.removeItem('returnUrl');
      }
    } catch (error) {}

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  //TODO: should be getSession
  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const response = await fetchSession();

    if (response?.data?.error) {
      return { data: null };
    }
    return { data: response.data };
  }

  async signOut(): Promise<{ error?: string }> {
    // localStorage.removeItem('custom-auth-token');
    await logout();

    return {};
  }
}

export const authClient = new AuthClient();
