import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../features/auth";

const WhatsAppIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-red-50 border border-red-500 flex items-center justify-center shrink-0">
      <span className="text-red-600 font-bold text-sm" style={{ fontFamily: "Georgia, serif" }}>
        L
      </span>
    </div>
    <span
      className="text-lg font-bold text-gray-900 tracking-tight"
      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
    >
      LUMIÈRE
    </span>
  </div>
);

const NAV_LINKS = [
  { name: "Home", to: ROUTES.CUSTOMER },
  { name: "About", to: ROUTES.CUSTOMER_ABOUT },
  { name: "Room", to: ROUTES.CUSTOMER_ROOM },
  { name: "Services", to: ROUTES.CUSTOMER_SERVICE },
  { name: "My Booking", to: ROUTES.CUSTOMER },
  // { name: "Contact", to: "/contact" },
];

const getInitials = (name = "") => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return initials.toUpperCase() || "GU";
};

const getRoleName = (user) => {
  if (typeof user?.role === "string") return user.role;
  if (user?.role?.name) return user.role.name;
  if (Array.isArray(user?.roles) && user.roles.length > 0) {
    const firstRole = user.roles[0];
    return typeof firstRole === "string" ? firstRole : firstRole?.name || firstRole?.slug;
  }

  return "Customer";
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const displayName = user?.name || "Guest User";
  const displayEmail = user?.email || "Sign in to view your account";
  const displayRole = getRoleName(user);
  const userInitials = getInitials(displayName);
  const isActiveLink = (link) => {
    if (link.to === ROUTES.CUSTOMER) {
      return link.name === "Home" && location.pathname === ROUTES.CUSTOMER;
    }

    return location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="sticky top-0 z-50 w-full">
        {/* Top Bar */}
        <div className="bg-gray-900 text-gray-400 text-xs px-6 md:px-10 py-1.5 flex flex-wrap items-center justify-between gap-2">
          {/* Left */}
          <div className="flex items-center gap-4">
            <select className="bg-gray-800 text-gray-400 border border-gray-700 rounded px-2 py-0.5 text-xs cursor-pointer focus:outline-none">
              <option>EN</option>
              <option>KH</option>
            </select>
            <a
              href="https://wa.me/917878533701"
              className="flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors duration-200 no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              <span>+96 9839 871</span>
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span>Monday–Friday: 07:00am – 07:00pm</span>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white shadow-sm px-6 md:px-10 flex items-center justify-between h-16 relative">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      isActiveLink(link)
                        ? "text-red-600 font-semibold"
                        : "text-gray-700 hover:text-red-500 hover:bg-red-50"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Profile Menu - Desktop */}
            <div className="relative hidden md:block" ref={profileRef}>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-2 text-sm font-semibold text-gray-800 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  aria-expanded={profileOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {userInitials}
                  </span>
                  <span className="max-w-28 truncate">{displayName}</span>
                  <ChevronDownIcon />
                </button>
              ) : (
                <Link
                  to={ROUTES.LOGIN}
                  className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700"
                >
                  <UserIcon />
                  Login
                </Link>
              )}

              {profileOpen && isAuthenticated && (
                <div
                  className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xl"
                  role="menu"
                >
                  <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                        {userInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">{displayName}</p>
                        <p className="truncate text-xs text-gray-500">{displayEmail}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="rounded-md bg-gray-50 p-3">
                        <p className="text-gray-500">Role</p>
                        <p className="mt-1 truncate font-semibold capitalize text-gray-900">{displayRole}</p>
                      </div>
                      <div className="rounded-md bg-gray-50 p-3">
                        <p className="text-gray-500">Status</p>
                        <p className="mt-1 font-semibold text-green-600">Active</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      to={ROUTES.CUSTOMER_PROFILE}
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                      role="menuitem"
                    >
                      View Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-4 z-40">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => {
                  setMenuOpen(false);
                }}
                className={`block px-4 py-3 text-sm font-medium border-b border-gray-100 last:border-b-0 transition-colors
                  ${
                    isActiveLink(link)
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-500"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    {userInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">{displayName}</p>
                    <p className="truncate text-xs text-gray-500">{displayEmail}</p>
                    <p className="mt-1 text-xs font-semibold capitalize text-red-600">{displayRole}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    to={ROUTES.CUSTOMER_PROFILE}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-gray-700 transition-colors hover:text-red-600"
                  >
                    View Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <UserIcon />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
