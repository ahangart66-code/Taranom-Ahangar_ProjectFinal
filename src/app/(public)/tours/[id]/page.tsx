type TourDetailsPageProps = {
  params: { id: string };
};

export default function TourDetailsPage({ params }: TourDetailsPageProps) {
  return (
    <div className="container-app py-10">
      <h1 className="mb-3 text-2xl font-bold text-ink">جزئیات تور</h1>
      <p className="text-sm text-ink-muted">
        شناسه تور: <span className="font-medium text-ink">{params.id}</span>
      </p>
      <p className="mt-4 text-sm leading-7 text-ink-muted">
        این صفحه در فاز بعدی با SSR و داده واقعی API تکمیل می‌شود.
      </p>
    </div>
  );
}
