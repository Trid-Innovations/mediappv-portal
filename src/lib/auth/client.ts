
'use client';
// import { cookies } from 'next/headers'
import Cookies from 'js-cookie';
import type { User } from '@/types/user';
// import { useCookie } from './cookie';

function generateToken(): string
{
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar-11.png',
  firstName: 'Aristote',
  lastName: 'Lamine',
  email: 'aristote.lamine@example.io',
} satisfies User;

export interface SignUpParams
{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams
{
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams
{
  email: string;
  password: string;
}

export interface ResetPasswordParams
{
  email: string;
}

class AuthClient
{

  async signUp(_: SignUpParams): Promise<{ error?: string }>
  {
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);
    // Cookies.set('token', token, { expires: Date.now() + oneDay, secure: true });
    // cookies().set('mediappv', 'lee', { secure: true, expires: Date.now() + oneDay })
    // const [sessionToken: string, setSessionToken, deleteSessionToken] = useCookie("sessionToken");
    // setSessionToken(token, 2);
    //document.cookie = `${cookieName}=${value}; expires=${(Date.now() + oneDay)}; path=/`;
    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }>
  {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }>
  {
    const { email, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    if (email !== 'aristote.lamine@example.io' || password !== 'Secret1')
    {
      return { error: 'Invalid credentials' };
    }

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);
    //"MEDIAPPV_SESSION_TOKEN=validMediappvSessionJWT; Expires=Tue, 19 Jan 2038 03:14:07 GMT; HttpOnly; Secure; SameSite=Strict; Path=/; Domain=.mediappv.io;"

    Cookies.set('MEDIAPPV_SESSION_TOKEN_LOCAL', 'validMediappvSessionJWT', { expires: Date.now() + (24 * 60 * 60) })
    Cookies.set('MEDIAPPV_SESSION_TOKEN', 'validMediappvSessionJWT', { expires: Date.now() + (24 * 60 * 60), secure: true, httpOnly: true, domain: '.mediappv.io', path: '/', sameSite: "strict" })
    // const oneDay = 24 * 60 * 60
    // useCookie.
    // cookies().set('mediappv', 'lee', { secure: true, expires: Date.now() + (24 * 60 * 60) })
    // const [username, setUsername, deleteUsername] = useCookie("username");
    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }>
  {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }>
  {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }>
  {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token)
    {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }>
  {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
