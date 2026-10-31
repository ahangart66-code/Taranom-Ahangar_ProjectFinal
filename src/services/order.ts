import { http } from '@/services/http';
import type { OrderPayload } from '@/types/user';

export async function createOrder(payload: OrderPayload) {
  const { data } = await http.post<{ message: string }>('/order', payload);
  return data;
}
