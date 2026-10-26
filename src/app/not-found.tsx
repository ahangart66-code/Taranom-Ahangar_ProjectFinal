import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { NotFoundView } from '@/components/layout/NotFoundView';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <NotFoundView />
      </main>
      <Footer />
    </div>
  );
}
