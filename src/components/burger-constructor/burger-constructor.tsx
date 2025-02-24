import React, { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';
import { createOrderThunk, resetOrder } from '../../services/slices/orderSlice';
import { TIngredient, TOrder } from '../../utils/types';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { orderNumber, isLoading } = useSelector((state) => state.order);

  // Общая стоимость
  const price = useMemo(() => {
    let total = 0;
    if (bun) total += bun.price * 2;
    total += ingredients.reduce(
      (acc: number, item: TIngredient) => acc + item.price,
      0
    );
    return total;
  }, [bun, ingredients]);

  const orderModalData: TOrder | null = orderNumber
    ? {
        _id: '',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        ingredients: [],
        number: orderNumber
      }
    : null;

  const onOrderClick = () => {
    if (!bun) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const ingredientsIds = [bun._id, ...ingredients.map((i) => i._id), bun._id];
    dispatch(createOrderThunk(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
