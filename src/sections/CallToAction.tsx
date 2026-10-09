import { BookOpen, Download } from 'lucide-react';
import { LogoMark } from '../components/Logo';
import { ButtonLink } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { availabilitySummary } from '../lib/availability';

export function CallToAction() {
  return (
    <section aria-labelledby="cta-title" className="py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-surface px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="absolute top-[-120px] left-1/2 h-[260px] w-[520px] -translate-x-1/2 rounded-full bg-cyan/12 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6">
            <LogoMark size={52} />
            <h2
              id="cta-title"
              className="text-balance text-[34px] leading-[1.08] font-bold tracking-[-0.03em] sm:text-[48px]"
            >
              Bring your devices together.
            </h2>
            <p className="text-lg text-muted">
              Get Sharely on your computer and start transferring files.
            </p>
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <ButtonLink to="/download" size="lg">
                <Download size={18} aria-hidden="true" />
                Download Sharely
              </ButtonLink>
              <ButtonLink to="/install" variant="secondary" size="lg">
                <BookOpen size={18} aria-hidden="true" />
                View installation guide
              </ButtonLink>
            </div>
            <p className="text-sm text-muted">{availabilitySummary()}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
