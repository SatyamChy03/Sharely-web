export type NetworkRequirement = 'none' | 'local-network' | 'internet';

interface ProductFacts {
  pairing: string;
  isFree: boolean | null;
  networkRequirement: NetworkRequirement | null;
  transferModel: string | null;
  defaultSaveFolder: string | null;
  updates: string | null;
}

/**
 * Statements the site makes about the app. A `null` shows a neutral
 * "to be announced" answer, so nothing is claimed before it is true.
 */
export const facts: ProductFacts = {
  pairing: 'Scan a QR code shown on your computer, or type the 6-digit code under it.',
  isFree: null,
  networkRequirement: 'local-network',
  transferModel:
    'Files go straight from one device to the other over your local network. There are no accounts, and nothing is uploaded to a server in between.',
  defaultSaveFolder: null,
  updates: null,
};
