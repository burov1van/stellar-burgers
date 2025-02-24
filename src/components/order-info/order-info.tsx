import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TOrder, TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  // Получаем заказы из публичной ленты (или можно использовать userOrders, если заказы там)
  const { orders } = useSelector((state) => state.feed);
  // Получаем список всех ингредиентов из Redux
  const { items: ingredients } = useSelector((state) => state.ingredients);

  const orderData = orders.find(
    (order: TOrder) => order.number === Number(number)
  );

  console.log('OrderInfo: orderData:', orderData);
  console.log('OrderInfo: ingredients:', ingredients);

  // Вычисляем итоговый объект для отображения
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          if (!acc[item]) {
            acc[item] = { ...ingredient, count: 1 };
          } else {
            acc[item].count++;
          }
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    const date = new Date(orderData.createdAt);

    const info = {
      ...orderData,
      ingredientsInfo,
      total,
      date
    };

    console.log('OrderInfo useMemo orderInfo:', info);
    return info;
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
