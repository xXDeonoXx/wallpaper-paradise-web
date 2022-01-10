import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApi(ctx?: any) {
  const { access_token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (access_token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  }

  return api;
}
