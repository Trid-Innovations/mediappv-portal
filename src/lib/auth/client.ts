'use client';

import Cookies from 'js-cookie';

import type { User } from '@/types/user';

import { createSession, fetchSession, requestValidateSession } from './session-client';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

// const user = {
//   id: 'USR-000',
//   avatar: '/assets/avatar-11.png',
//   firstName: 'Aristote',
//   lastName: 'Lamine',
//   email: 'aristote.lamine@example.io',
// } satisfies User;

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
      const response = await createSession({ username: email, password: password });
      const { sessionToken } = response.data;
      const validateSessionResponse = await requestValidateSession(sessionToken);

      if (!validateSessionResponse?.data?.error) {
        Cookies.set('MEDIAPPV_SESSION_TOKEN', 'validMediappvSessionJWT', {
          expires: 1,
          secure: true,
          path: '/',
          sameSite: 'Lax',
          httpOnly: false,
          domain: '.mediappv.tech',
        });

        // //TODO: this handle the redirection when we come from the provider for a login request
        // const returnUrl = localStorage.getItem('returnUrl');
        // const articleLink = localStorage.getItem('articleLink');
        // const providerId = localStorage.getItem('providerId');
        // const cost = localStorage.getItem('cost');
        // if (returnUrl) {
        //   // Close the current tab

        //   debugger;
        //   const fullReturnUrl = `${returnUrl}?mediappvSession=validMediappvSessionJWT&cost=${cost}&providerId=${providerId}&articleLink=${articleLink}&redirection=true`;
        //   const urlObj = new URL(fullReturnUrl);

        //   const path = urlObj.toString();
        //   window.close();
        //   window.window.history.pushState({ path }, '', path);
        //   localStorage.removeItem('returnUrl');
        //   localStorage.removeItem('articleLink');
        //   localStorage.removeItem('providerId');
        //   localStorage.removeItem('cost');
        // }
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
    } else {
      return { data: response.data };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
