import { notFound } from 'next/navigation';

export default function UnknownPage() {
  notFound();
  return null;
}
