// src/pages/Login.tsx
import { FC, SyntheticEvent, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/authSlice';
import { LoginUI } from '@ui-pages';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Если уже залогинились — редиректим на "/"
  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      // можно передавать isLoading, если хочешь дизейблить кнопку
    />
  );
};
