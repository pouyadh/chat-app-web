import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from 'config';

export type Forms = {
  Signup: {
    username: string;
    password: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  Signin: {
    username: string;
    password: string;
  };
  SendResetPasswordLinkToUserEmail: {
    email: string;
  };
  ResetPassword: { newPassword: string; resetPasswordToken: string };
  DeleteAccount: { password: string };
  UpdateCredentials: {
    password: string;
    updates: {
      password?: string;
      email?: string;
    };
  };
  UpdateProfile: {
    updates: {
      avatarUrl?: string;
      name?: string;
    };
  };
  GetPublicProfiles: { userIds: string[] };
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.serverBaseUrl + '/user',
    credentials: 'include',
    responseHandler: 'content-type',
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<void, Forms['Signup']>({
      query: (form) => ({
        url: `signup`,
        method: 'POST',
        body: form,
      }),
    }),
    signin: builder.mutation<void, Forms['Signin']>({
      query: (form) => ({
        url: `signin`,
        method: 'POST',
        body: form,
      }),
    }),
    signout: builder.mutation<void, void>({
      query: () => ({
        url: `signout`,
        method: 'DELETE',
      }),
    }),
    sendResetPasswordLinkToUserEmail: builder.mutation<
      void,
      Forms['SendResetPasswordLinkToUserEmail']
    >({
      query: (form) => ({
        url: `send-reset-link-to-user-email`,
        method: 'POST',
        body: form,
      }),
    }),
    resetPassword: builder.mutation<void, Forms['ResetPassword']>({
      query: (form) => ({
        url: `reset-password`,
        method: 'PATCH',
        body: form,
      }),
    }),
    getToken: builder.mutation<void, void>({
      query: () => ({
        url: `token`,
        method: 'GET',
      }),
    }),
    updateCredentials: builder.mutation<void, Forms['UpdateCredentials']>({
      query: (form) => ({
        url: 'update-credentials',
        method: 'PATCH',
        body: form,
      }),
    }),
    updateProfile: builder.mutation<void, Forms['UpdateProfile']>({
      query: (form) => ({
        url: 'update-profile',
        method: 'PATCH',
        body: form,
      }),
    }),
    getData: builder.query<void, void>({
      query: () => '',
    }),
    getPublicProfiles: builder.query<void, Forms['GetPublicProfiles']>({
      query: (form) => ({
        url: 'public-profiles',
        method: 'POST',
        body: form,
      }),
    }),
  }),
});
