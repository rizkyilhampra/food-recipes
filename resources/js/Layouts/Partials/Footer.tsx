import { Link } from 'ui';

export function Footer() {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="mt-16 border-t border-slate-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <p className="mt-8 text-xs leading-5 text-muted-fg md:order-1 md:mt-0">
            &copy; 2024{' '}
            <Link
              target="_blank"
              href="https://instagram.com/rizkyilhampra"
              className="font-semibold text-fg"
            >
              rizkyilhampra
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
