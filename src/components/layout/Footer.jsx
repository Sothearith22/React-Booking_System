import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const footerLinks = {
  explore: [
    { label: 'Rooms & Suites', to: ROUTES.CUSTOMER_ROOM },
    { label: 'Curated Services', to: ROUTES.CUSTOMER_SERVICE, featured: true },
    { label: 'Exclusive Offers', to: ROUTES.CUSTOMER },
    { label: 'Wellness Sanctuary', to: ROUTES.CUSTOMER_SERVICE },
  ],
  lumiere: [
    { label: 'Our Story', to: ROUTES.CUSTOMER_ABOUT },
    { label: 'Sustainability', to: ROUTES.CUSTOMER_ABOUT },
    { label: 'Careers', to: ROUTES.CUSTOMER_CONTACT },
    { label: 'Press Room', to: ROUTES.CUSTOMER_CONTACT },
  ],
  legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 .01 0H12Zm6.93 6h-3.04a15.65 15.65 0 0 0-1.1-2.66A8.03 8.03 0 0 1 18.93 8ZM12 4.04c.83 1.2 1.48 2.52 1.92 3.96h-3.84A14.04 14.04 0 0 1 12 4.04ZM4.26 14a8.16 8.16 0 0 1 0-4h3.43a16.92 16.92 0 0 0 0 4H4.26Zm.81 2h3.04c.28.94.65 1.83 1.1 2.66A8.03 8.03 0 0 1 5.07 16Zm3.04-8H5.07a8.03 8.03 0 0 1 4.14-2.66A15.65 15.65 0 0 0 8.11 8ZM12 19.96A14.04 14.04 0 0 1 10.08 16h3.84A14.04 14.04 0 0 1 12 19.96ZM14.35 14h-4.7a14.63 14.63 0 0 1 0-4h4.7a14.63 14.63 0 0 1 0 4Zm.44 4.66c.45-.83.82-1.72 1.1-2.66h3.04a8.03 8.03 0 0 1-4.14 2.66ZM16.31 14a16.92 16.92 0 0 0 0-4h3.43a8.16 8.16 0 0 1 0 4h-3.43Z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 1 0 15 5c0 .24.04.47.09.7L8.04 9.81A3 3 0 1 0 8.04 14l7.12 4.18c-.05.21-.08.43-.08.65a2.92 2.92 0 1 0 2.92-2.75Z" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13Zm-5 4h8v2H8v-2Zm0 4h8v2H8v-2Z" />
  </svg>
);
 //backt to top
const BackToTop = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleBackToTop}
      className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-300 transition hover:text-white"
    >
      Back to top &uarr;
    </button>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-[#0b0d22] text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">

        <section className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          <div>
            <Link
              to={ROUTES.CUSTOMER}
              className="text-base font-bold uppercase tracking-[0.36em] text-yellow-300"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Lumiere
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-7 text-slate-400">
              A destination for those who appreciate the quiet art of luxury and the deep roots of heritage.
            </p>
            <div className="mt-6 flex items-center gap-5 text-slate-400">
              <a href="/" aria-label="Website" className="transition hover:text-yellow-300">
                <GlobeIcon />
              </a>
              <a href="/" aria-label="Share" className="transition hover:text-yellow-300">
                <ShareIcon />
              </a>
              <a href="/" aria-label="Brochure" className="transition hover:text-yellow-300">
                <DocumentIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Explore
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={`text-sm transition hover:text-yellow-300 ${
                      link.featured ? 'text-yellow-300' : 'text-slate-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Lumiere
            </h3>
            <ul className="mt-6 space-y-4">
              {footerLinks.lumiere.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-slate-400 transition hover:text-yellow-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Contact
            </h3>
            <address className="mt-6 not-italic text-sm leading-7 text-slate-400">
              <p>128 Heritage Blvd,</p>
              <p>Mayfair, London W1</p>
              <a href="tel:+442079460123" className="mt-4 block transition hover:text-yellow-300">
                +44 20 7946 0123
              </a>
              <a href="mailto:concierge@lumiere.com" className="mt-2 block transition hover:text-yellow-300">
                concierge@lumiere.com
              </a>
            </address>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-7 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>2024 LUMIERE Grand Hotel & Spa. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.legal.map((label) => (
              <a key={label} href="/" className="transition hover:text-yellow-300">
                {label}
              </a>
            ))}
          </div>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
