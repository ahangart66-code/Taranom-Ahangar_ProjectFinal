import { http } from '@/services/http';
import type { Tour } from '@/types/tour';
import type {
  Transaction,
  UpdateProfilePayload,
  UpdateProfileResponse,
  UserProfile,
} from '@/types/user';

export async function getProfile() {
  const { data } = await http.get<UserProfile>('/user/profile');
  return data;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const { data } = await http.put<UpdateProfileResponse>('/user/profile', payload);
  return data;
}

export async function getUserTours() {
  const { data } = await http.get<Array<Tour | null>>('/user/tours');
  return (data || []).filter((tour): tour is Tour => Boolean(tour?.id));
}

export async function getTransactions() {
  const { data } = await http.get<Transaction[]>('/user/transactions');
  return data || [];
}
