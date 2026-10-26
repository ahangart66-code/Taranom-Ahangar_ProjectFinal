import { http } from '@/services/http';

type BasketMessage = {
  message: string;
};

export async function addToBasket(tourId: string) {
  const { data } = await http.put<BasketMessage>(`/basket/${tourId}`);
  return data;
}
