import { ButtonLink } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { useMeta } from '../lib/useMeta';

const NOT_FOUND_META = {
  path: '/404',
  title: 'Page not found — Sharely',
  description: 'This page does not exist.',
};

export default function NotFound() {
  useMeta(NOT_FOUND_META);
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <p className="font-mono text-sm text-cyan">404</p>
      <h1 className="text-4xl font-bold tracking-[-0.03em]">This page didn't make the transfer.</h1>
      <p className="max-w-md text-muted">
        The link may be old or mistyped. Try the home page or the download center.
      </p>
      <div className="flex gap-3">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/download" variant="secondary">
          Downloads
        </ButtonLink>
      </div>
    </Container>
  );
}
