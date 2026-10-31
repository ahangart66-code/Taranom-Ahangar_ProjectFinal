import { http } from '@/services/http';
import type { UpdateProfilePayload, UpdateProfileResponse, UserProfile } from '@/types/user';

export async function getProfile() {
  const { data } = await http.get<UserProfile>('/user/profile');
  return data;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const { data } = await http.put<UpdateProfileResponse>('/user/profile', payload);
  return data;
}
