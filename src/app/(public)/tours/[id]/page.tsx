import axios from 'axios';
import { notFound } from 'next/navigation';
import { TourDetails } from '@/components/tours/TourDetails';
import { fetchTourById } from '@/services/tours';

export const dynamic = 'force-dynamic';

type TourDetailsPageProps = {
  params: { id: string };
};

export default async function TourDetailsPage({ params }: TourDetailsPageProps) {
  try {
    const tour = await fetchTourById(params.id);
    if (!tour?.id) notFound();
    return <TourDetails tour={tour} />;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }
}
