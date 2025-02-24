import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

// Импортируем страницы из папки src/pages
import { ConstructorPage } from '../../pages/constructor-page';
import { Feed } from '../../pages/feed';
import { Login } from '../../pages/login';
import { Register } from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Profile } from '../../pages/profile';
import { ProfileOrders } from '../../pages/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404';

// Импортируем модальные окна
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

// Импортируем защищённый маршрут
import ProtectedRoute from '../ProtectedRoute';

const App = () => (
  <div className={styles.app}>
    <Router>
      <AppHeader />
      <AppRoutes />
    </Router>
  </div>
);

const AppRoutes = () => {
  const navigate = useNavigate();

  // Функция закрытия модалок для остальных страниц
  const handleCloseModal = () => {
    navigate(-1);
  };

  // Новая функция закрытия для модалки из /profile/orders
  const handleCloseProfileOrderModal = () => {
    navigate('/profile/orders', { replace: true });
  };

  return (
    <Routes>
      {/* Основные маршруты */}
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />

      {/* Маршруты для авторизации/регистрации и восстановления пароля */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      {/* Защищённые маршруты */}
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />

      {/* Неизвестный маршрут */}
      <Route path='*' element={<NotFound404 />} />

      {/* Маршруты для модальных окон */}
      <Route
        path='/feed/:number'
        element={
          <Modal title='' onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='' onClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <Modal title='' onClose={handleCloseProfileOrderModal}>
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
