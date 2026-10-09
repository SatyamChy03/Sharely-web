import type { MouseEvent } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollManager } from './ScrollManager';

function focusMainContent(event: MouseEvent<HTMLAnchorElement>) {
  // Moving focus, not the address, keeps "#main" out of the router's history.
  event.preventDefault();
  document.getElementById('main')?.focus();
}

export function Layout() {
  return (
    <>
      <a
        href="#main"
        onClick={focusMainContent}
        className="sr-only z-[60] rounded-btn bg-cyan px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
