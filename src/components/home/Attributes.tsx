const items = [
  {
    title: 'بصرفه ترین قیمت',
    text: 'بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.',
    src: '/images/besarfe.svg',
    width: 122,
    height: 110,
  },
  {
    title: 'پشتیبانی',
    text: 'پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.',
    src: '/images/support.svg',
    width: 110,
    height: 100,
  },
  {
    title: 'رضایت کاربران',
    text: 'رضایت بیش از 10هزار کاربر از تور های ما.',
    src: '/images/rezayat.svg',
    width: 105,
    height: 105,
  },
];

export function Attributes() {
  return (
    <section className="container-app relative mt-10 border-t border-black/20 py-7">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-[67px]">
        {items.map((item) => (
          <figure key={item.title} className="flex items-center">
            <img
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              className="shrink-0"
            />
            <figcaption className="mr-2">
              <h3 className="whitespace-nowrap text-lg font-medium text-ink sm:text-[26px] sm:leading-none">
                {item.title}
              </h3>
              <p className="mt-1 max-w-[250px] text-sm font-light leading-7 text-ink sm:text-base">
                {item.text}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
