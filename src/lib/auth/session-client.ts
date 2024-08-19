import { SessionRequest } from '@/types/session';

import webClient from './web-client';

export function createSession(data: SessionRequest) {
  return webClient.request({
    method: 'post',
    url: '/create-session',
    data,
  });
}
export function requestValidateSession(sessionToken: string) {
  return webClient.request({
    method: 'post',
    url: '/validate-session',
    ...(sessionToken && {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  });
}

export function fetchSession() {
  return webClient.request({
    method: 'get',
    url: '/session',
  });
}
