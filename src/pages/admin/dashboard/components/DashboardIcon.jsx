export default function DashboardIcon({ name, className = 'h-5 w-5' }) {
  const sharedProps = {
    className,
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    focusable: 'false',
  };

  switch (name) {
    case 'logo':
      return (
        <svg {...sharedProps}>
          <path d="M12 3c-3.5 0-6 2.5-6 5.7 0 4.8 6 11.3 6 11.3s6-6.5 6-11.3C18 5.5 15.5 3 12 3Z" />
          <circle cx="12" cy="8.7" r="2.2" />
        </svg>
      );
    case 'dashboard':
      return (
        <svg {...sharedProps}>
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      );
    case 'bookings':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
          <path d="m8 15 2 2 5-5" />
        </svg>
      );
    case 'rooms':
      return (
        <svg {...sharedProps}>
          <path d="M6 21V5a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v17" />
          <path d="M9 21V7h6v14" />
          <path d="M12 14h.01" />
        </svg>
      );
    case 'occupancy':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 3.5V12l7.4-2.6" />
          <path d="M12 12v8.5" />
        </svg>
      );
    case 'services':
      return (
        <svg {...sharedProps}>
          <path d="M4 7h10" />
          <path d="M18 7h2" />
          <path d="M4 12h3" />
          <path d="M11 12h9" />
          <path d="M4 17h11" />
          <path d="M19 17h1" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="9" cy="12" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case 'guests':
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M14.5 18.5a4.5 4.5 0 0 1 6-3.7" />
        </svg>
      );
    case 'user-plus':
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="8" r="3" />
          <path d="M4.5 18a4.5 4.5 0 0 1 9 0" />
          <path d="M17 10v6M14 13h6" />
        </svg>
      );
    case 'cleaning':
      return (
        <svg {...sharedProps}>
          <path d="M8 11V4" />
          <path d="M6 11h4" />
          <path d="M5 20h14" />
          <path d="M7 20v-5a3 3 0 0 1 3-3h1v8" />
          <path d="M13 20v-8h1a3 3 0 0 1 3 3v5" />
        </svg>
      );
    case 'card':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M4 10h16" />
          <path d="M8 15h5" />
        </svg>
      );
    case 'finance':
      return (
        <svg {...sharedProps}>
          <rect x="3" y="7" width="18" height="10" rx="2" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M7 10v4M17 10v4" />
        </svg>
      );
    case 'staff':
      return (
        <svg {...sharedProps}>
          <path d="M12 3l7 4v5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V7l7-4Z" />
          <path d="M9.5 12.2 11 13.7l3.5-3.9" />
        </svg>
      );
    case 'reports':
      return (
        <svg {...sharedProps}>
          <path d="M6 20V10" />
          <path d="M12 20V4" />
          <path d="M18 20v-7" />
        </svg>
      );
    case 'products':
      return (
        <svg {...sharedProps}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="m4 7.5 8 4.5 8-4.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case 'categories':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="4" width="6" height="6" rx="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" />
          <rect x="14" y="14" width="6" height="6" rx="1.5" />
        </svg>
      );
    case 'inventory':
      return (
        <svg {...sharedProps}>
          <path d="M4 8h16" />
          <path d="M6 8v12h12V8" />
          <path d="M8 4h8l2 4H6l2-4Z" />
          <path d="M9 13h6" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1 .2l-.2.1a2 2 0 0 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1l-.1-.2a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.2a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .7.9 1 1 0 0 0 1-.2l.2-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.2a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.7Z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...sharedProps}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...sharedProps}>
          <path d="M15 18H5.8c-.8 0-1.3-.9-.8-1.5l1.1-1.4V11a6 6 0 0 1 12 0v4.1l1.1 1.4c.5.6 0 1.5-.8 1.5H15" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...sharedProps}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case 'message':
      return (
        <svg {...sharedProps}>
          <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case 'trend-up':
      return (
        <svg {...sharedProps}>
          <path d="m4 16 5-5 4 4 7-8" />
          <path d="M15 7h5v5" />
        </svg>
      );
    case 'participants':
      return (
        <svg {...sharedProps}>
          <circle cx="8" cy="9" r="2.5" />
          <circle cx="16.5" cy="8.5" r="2" />
          <path d="M4.5 17a4 4 0 0 1 7 0" />
          <path d="M14 17a3.5 3.5 0 0 1 5 0" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...sharedProps}>
          <path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z" />
          <path d="m18.5 15 .8 1.7 1.7.8-1.7.8-.8 1.7-.8-1.7-1.7-.8 1.7-.8.8-1.7Z" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...sharedProps}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg {...sharedProps}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...sharedProps}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...sharedProps}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case 'more-vertical':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
