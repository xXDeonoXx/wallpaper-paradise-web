import { destroyCookie, parseCookies } from 'nookies';
import { getApi } from '../services/api';

export function withAuth(gssp: any) {
  return async (context: any) => {
    const api = getApi(context);
    const { access_token } = parseCookies(context);

    if (!access_token) {
      // Redirect to login page
      return {
        redirect: {
          destination: '/login',
          statusCode: 302,
        },
      };
    }
    try {
      await api.get('/users/personal-info');
      return await gssp(context); // Continue on to call `getServerSideProps` logic
    } catch (error) {
      console.log(error);
      destroyCookie(context, 'access_token');
      return {
        redirect: {
          destination: '/login',
          statusCode: 302,
        },
      };
    }
  };
}
