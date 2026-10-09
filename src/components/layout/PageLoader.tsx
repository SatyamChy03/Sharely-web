export function PageLoader() {
  return (
    <div role="status" className="flex min-h-[60vh] items-center justify-center gap-3 text-muted">
      <span
        className="size-5 animate-spin rounded-full border-2 border-line-strong border-t-cyan"
        aria-hidden="true"
      />
      Loading…
    </div>
  );
}
