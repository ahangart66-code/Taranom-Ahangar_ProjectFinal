import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-50">
      <div className="container-app grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="mb-3 text-lg font-bold text-brand">Torino</p>
          <p className="text-sm leading-7 text-ink-muted">
            تورینو برگزارکننده تورهای داخلی و خارجی با خدمات حرفه‌ای و پشتیبانی
            همیشگی است.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ink">دسترسی سریع</p>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li>
              <Link href="/" className="hover:text-brand">
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand">
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand">
                تماس با ما
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ink">تماس</p>
          <p className="text-sm text-ink-muted">021-35784</p>
          <p className="mt-2 text-sm text-ink-muted">support@torino.ir</p>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} Torino — همه حقوق محفوظ است.
      </div>
    </footer>
  );
}
