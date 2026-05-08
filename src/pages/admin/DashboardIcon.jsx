const baseClassName = 'h-5 w-5';

function iconProps(className) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: className || baseClassName,
  };
}

export default function DashboardIcon({ name, className }) {
  const props = iconProps(className);

  switch (name) {
    case 'overview':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="4" rx="1.5" />
          <rect x="14" y="10" width="7" height="11" rx="1.5" />
          <rect x="3" y="13" width="7" height="8" rx="1.5" />
        </svg>
      );
    case 'rooms':
      return (
        <svg {...props}>
          <path d="M4 12V8a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v3" />
          <path d="M2.5 18v-4a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v4" />
          <path d="M4 18v2M20 18v2" />
          <path d="M9 9h.01" />
        </svg>
      );
    case 'bookings':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
          <path d="M8 14h3M13 14h3M8 18h3" />
        </svg>
      );
    case 'services':
      return (
        <svg {...props}>
          <path d="M8 4v6" />
          <path d="M6 4h4" />
          <path d="M10 10a4 4 0 0 1-4 4H5a2 2 0 0 0-2 2v4" />
          <path d="M14 4h5v5" />
          <path d="M14 9l7-7" />
          <path d="M13 14h8" />
          <path d="M13 18h8" />
        </svg>
      );
    case 'guests':
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="8" r="3.5" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16.5 4.13a3.5 3.5 0 0 1 0 6.74" />
        </svg>
      );
    case 'finance':
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 14h4" />
          <circle cx="17" cy="14" r="1.5" />
        </svg>
      );
    case 'staff':
      return (
        <svg {...props}>
          <path d="M12 3l7 4v5c0 4.25-2.5 7.75-7 9-4.5-1.25-7-4.75-7-9V7l7-4Z" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      );
    case 'reports':
      return (
        <svg {...props}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-6" />
          <path d="M22 20v-9" />
          <path d="M2 20h20" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...props}>
          <path d="M4 7h10" />
          <path d="M18 7h2" />
          <path d="M4 17h2" />
          <path d="M10 17h10" />
          <circle cx="16" cy="7" r="2" />
          <circle cx="8" cy="17" r="2" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...props}>
          <path d="M15 17H5.5a1.5 1.5 0 0 1-1.12-2.5l.82-.92a4 4 0 0 0 .8-2.42V9a6 6 0 1 1 12 0v2.16a4 4 0 0 0 .8 2.42l.82.92A1.5 1.5 0 0 1 18.5 17H15" />
          <path d="M9 20a3 3 0 0 0 6 0" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'download':
      return (
        <svg {...props}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 20h14" />
        </svg>
      );
    case 'arrowRight':
      return (
        <svg {...props}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...props}>
          <path d="m12 3 1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3Z" />
          <path d="m18 15 .8 2 .8-2 2-.8-2-.8-.8-2-.8 2-2 .8Z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
