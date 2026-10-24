import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <DashboardShell>{children}</DashboardShell>
      </main>
      <Footer />
    </div>
  );
}
