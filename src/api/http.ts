import axios from 'axios';
import config from 'config';
import { UserPublicProfile } from './types';

export default {
  server: {
    '@': axios.create({
      baseURL: config.serverBaseUrl,
      withCredentials: true,
    }),
    user: {
      get ['@']() {
        const instance = axios.create({
          baseURL: config.serverBaseUrl + '/user',
          withCredentials: true,
        });
        instance.interceptors.response.use(
          (repsonse) => repsonse,
          (error) => {
            if (error.response) {
              return Promise.reject({
                original: error,
                message: error.response?.data?.message || 'Something went wrong.',
                status: error.response.status,
                statusText: error.response.statusText,
              });
            } else {
              return Promise.reject({
                original: error,
                message: error.message || 'Something went wrong.',
                status: 0,
                statusText: error.code || 'UNKNOWN',
              });
            }
          }
        );
        return instance;
      },
      signup(form: {
        username: string;
        password: string;
        name: string;
        email: string;
        avatarUrl: string;
      }) {
        return this['@'].post('/signup', form);
      },
      signin(form: { username: string; password: string; persistent?: boolean }) {
        return this['@'].post('/signin', form);
      },
      signout() {
        return this['@'].delete('/signout');
      },
      sendResetPasswordLinkToUserEmail(form: { email: string }) {
        return this['@'].post('/send-reset-link-to-user-email', form);
      },
      resetPassword(form: { newPassword: string; resetPasswordToken: string }) {
        return this['@'].patch('/reset-password', form);
      },
      getToken() {
        return this['@'].get('/token');
      },
      deleteAccount(form: { password: string }) {
        return this['@'].post('/delete-account', form);
      },
      updateCredentials(form: {
        password: string;
        updates: {
          password?: string;
          email?: string;
        };
      }) {
        return this['@'].patch('/update-credentials', form);
      },
      updateProfile(form: {
        updates: {
          avatarUrl?: string;
          name?: string;
        };
      }) {
        return this['@'].patch('/update-profile', form);
      },
      getData() {
        return this['@'].get('/');
      },
      getPublicProfiles(form: { userIds: string[] }) {
        return this['@'].post('/public-profiles', form) as Promise<UserPublicProfile[]>;
      },
    },
  },
} as const;
