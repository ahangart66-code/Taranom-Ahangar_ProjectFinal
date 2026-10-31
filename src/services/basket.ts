import axios from 'axios';
import { http } from '@/services/http';
import type { Tour } from '@/types/tour';

type BasketMessage = {
  message: string;
};

export async function addToBasket(tourId: string) {
  const { data } = await http.put<BasketMessage>(`/basket/${tourId}`);
  return data;
}

export async function getBasket(): Promise<Tour | null> {
  try {
    const { data } = await http.get<Tour>('/basket');
    if (!data?.id) return null;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
}
