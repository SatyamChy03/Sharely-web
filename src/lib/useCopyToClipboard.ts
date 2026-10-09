import { useCallback, useState } from 'react';

const COPIED_FEEDBACK_MS = 1600;

/** Copies text and reports `copied` briefly so a button can confirm it. */
export function useCopyToClipboard(text: string) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch {
      // Clipboard access can be refused; the text stays selectable on the page.
    }
  }, [text]);

  return { copied, copy };
}
