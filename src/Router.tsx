import { createBrowserRouter, RouterProvider } from 'react-router';
import { Home } from './home/Home';
import LoginForm from './auth/LoginForm.tsx';
import RegisterForm from './auth/RegisterForm.tsx';
import AuthGuard from './auth/security/AuthGuard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />
  },
]);
export const Router = () => {
  return <RouterProvider router={router} />;
};
