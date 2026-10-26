'use client';

type TourDetailsErrorProps = {
  reset: () => void;
};

export default function TourDetailsError({ reset }: TourDetailsErrorProps) {
  return (
    <div className="bg-[#f5f5f5] py-16">
      <div className="container-app text-center">
        <h1 className="mb-2 text-xl font-bold text-ink">اتصال به سرور برقرار نشد</h1>
        <p className="mb-6 text-sm text-ink-muted">جزئیات این تور الان در دسترس نیست.</p>
        <button type="button" onClick={reset} className="btn-primary">
          تلاش دوباره
        </button>
      </div>
    </div>
  );
}
