import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-brand-light to-white px-4 text-center">
      <p className="text-6xl font-bold text-brand">404</p>
      <h1 className="text-xl font-bold text-ink">صفحه پیدا نشد</h1>
      <p className="max-w-md text-sm text-ink-muted">
        آدرس وارد شده وجود ندارد یا جابه‌جا شده است.
      </p>
      <Link href="/" className="btn-primary">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
