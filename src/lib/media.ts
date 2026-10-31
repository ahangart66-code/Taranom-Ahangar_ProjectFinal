import { API_URL } from '@/lib/constants';

export function tourImageSrc(image?: string) {
  if (!image) return '';
  if (/^https?:\/\//i.test(image)) return image;
  if (image.startsWith('/')) return `${API_URL}${image}`;
  return image;
}
