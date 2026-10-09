import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';

const NAV_LINKS = [
  { label: 'Features', to: '/#features' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Downloads', to: '/download' },
  { label: 'FAQ', to: '/#faq' },
];

const NAV_LINK_CLASSES =
  'rounded-lg px-3 py-2 text-[15px] font-medium text-muted transition-colors duration-150 hover:text-fg hover:bg-elevated/60';

function useHasScrolled(): boolean {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const update = () => setHasScrolled(window.scrollY > 8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return hasScrolled;
}

/** Menu state tied to the current location, so navigating closes the menu. */
function useMobileMenu() {
  const location = useLocation();
  const [openedAtKey, setOpenedAtKey] = useState<string | null>(null);
  const isOpen = openedAtKey === location.key;

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedAtKey(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const toggle = () => setOpenedAtKey(isOpen ? null : location.key);
  return { isOpen, toggle };
}

function DesktopNav() {
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
      {NAV_LINKS.map((link) =>
        link.to.includes('#') ? (
          <Link key={link.to} to={link.to} className={NAV_LINK_CLASSES}>
            {link.label}
          </Link>
        ) : (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `${NAV_LINK_CLASSES} ${isActive ? 'text-fg' : ''}`}
          >
            {link.label}
          </NavLink>
        ),
      )}
    </nav>
  );
}

function MobileNav() {
  return (
    <nav id="mobile-menu" aria-label="Main" className="border-t border-line md:hidden">
      <Container className="flex flex-col gap-1 py-3">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex h-12 items-center rounded-lg px-3 text-base font-medium hover:bg-elevated"
          >
            {link.label}
          </Link>
        ))}
        <ButtonLink to="/download" size="lg" className="mt-2 w-full">
          Download Sharely
        </ButtonLink>
      </Container>
    </nav>
  );
}

export function Header() {
  const hasScrolled = useHasScrolled();
  const menu = useMobileMenu();
  const surface =
    hasScrolled || menu.isOpen
      ? 'border-line bg-ink/90 backdrop-blur-md'
      : 'border-transparent bg-ink';

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${surface}`}>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link to="/" aria-label="Sharely home" className="rounded-lg">
          <Logo />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <ButtonLink to="/download" className="h-10">
              Download Sharely
            </ButtonLink>
          </span>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-btn text-fg hover:bg-elevated md:hidden"
            aria-expanded={menu.isOpen}
            aria-controls="mobile-menu"
            aria-label={menu.isOpen ? 'Close menu' : 'Open menu'}
            onClick={menu.toggle}
          >
            {menu.isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>
      {menu.isOpen && <MobileNav />}
    </header>
  );
}
