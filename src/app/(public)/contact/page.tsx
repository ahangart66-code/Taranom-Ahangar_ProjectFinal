const contacts = [
  {
    label: 'تلفن پشتیبانی',
    value: '۰۲۱-۱۸۴۰',
    href: 'tel:0211840',
  },
  {
    label: 'دفتر',
    value: '۰۲۱-۸۵۷۴',
    href: 'tel:0218574',
  },
  {
    label: 'تماس',
    value: '۰۲۱-۳۵۷۸۴',
    href: 'tel:02135784',
  },
  {
    label: 'ایمیل',
    value: 'support@torino.ir',
    href: 'mailto:support@torino.ir',
  },
];

export default function ContactPage() {
  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">تماس با ما</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-muted">
        برای رزرو، پیگیری خرید یا پرسش درباره تورها از راه‌های زیر با تورینو در تماس باشید.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {contacts.map((item) => (
          <li key={item.href} className="rounded-2xl border border-black/10 bg-white p-5">
            <p className="text-sm text-ink-muted">{item.label}</p>
            <a href={item.href} className="mt-2 inline-block text-lg text-brand" dir="ltr">
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
