import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import Auth from 'components/auth/Auth';
//import Main from 'components/main/Main';
import SignInForm from 'components/auth/SignInForm';
import SignUpForm from 'components/auth/SignUpForm';
import ForgotPasswordForm from 'components/auth/ForgotPasswordForm';
import ResetPasswordForm from 'components/auth/ResetPasswordForm';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import Main from 'components/main/Main';
import Err from 'components/common/Err';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Main />,
        errorElement: <Err />,
        index: true,
      },
      {
        path: '/*',
        element: <Main />,
        errorElement: <Err />,
      },
      {
        path: '/auth',
        element: <Auth />,
        errorElement: <Err />,
        children: [
          {
            path: '/auth/signin',
            element: <SignInForm />,
          },
          {
            path: '/auth/signup',
            element: <SignUpForm />,
          },
          {
            path: '/auth/forgot-password',
            element: <ForgotPasswordForm />,
          },
          {
            path: '/auth/reset-password',
            element: <ResetPasswordForm />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
