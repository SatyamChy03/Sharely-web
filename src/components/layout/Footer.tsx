import { Link } from 'react-router-dom';
import { site } from '../../config/site';
import { Logo } from '../Logo';
import { Container } from '../ui/Container';

interface FooterLink {
  label: string;
  /** A page of this site. */
  to?: string;
  /** An outside address; `null` shows the entry as "soon". */
  href?: string | null;
}

const FOOTER_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/#features' },
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'FAQ', to: '/#faq' },
    ],
  },
  {
    title: 'Get Sharely',
    links: [
      { label: 'Downloads', to: '/download' },
      { label: 'Installation guide', to: '/install' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Privacy policy', href: site.privacyPolicyUrl },
      { label: 'Terms of use', href: site.termsUrl },
      { label: 'Contact support', href: site.supportEmail ? `mailto:${site.supportEmail}` : null },
      ...(site.githubUrl ? [{ label: 'GitHub', href: site.githubUrl }] : []),
    ],
  },
];

const CURRENT_YEAR = new Date().getFullYear();
const LINK_CLASSES = 'text-[15px] text-muted transition-colors hover:text-fg';

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.to) {
    return (
      <Link to={link.to} className={LINK_CLASSES}>
        {link.label}
      </Link>
    );
  }
  if (link.href) {
    return (
      <a href={link.href} className={LINK_CLASSES}>
        {link.label}
      </a>
    );
  }
  return (
    <span className="text-[15px] text-muted/70">
      {link.label} <span className="text-xs text-muted/70">· soon</span>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-deep">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex max-w-xs flex-col gap-4">
          <Logo />
          <p className="text-[15px] leading-relaxed text-muted">
            Send photos, videos and documents between your phone and your computer — in either
            direction.
          </p>
        </div>
        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-fg">{group.title}</h2>
            <ul className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-sm text-muted sm:flex-row sm:justify-between">
        <span>© {CURRENT_YEAR} Sharely</span>
        <span>{site.tagline}</span>
      </Container>
    </footer>
  );
}
