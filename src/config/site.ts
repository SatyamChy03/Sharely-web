const configuredUrl: string | undefined = import.meta.env.VITE_SITE_URL;

export const site = {
  name: 'Sharely',
  // Used for canonical and social links; set VITE_SITE_URL once the domain is known.
  url: (configuredUrl ?? globalThis.location?.origin ?? '').replace(/\/$/, ''),
  tagline: 'Your files. Across devices. Instantly.',
  description:
    'Move photos, videos, documents, and more between your phone and computer with a simple, seamless transfer experience.',
  supportEmail: null as string | null,
  githubUrl: 'https://github.com/SatyamChy03/Sharely' as string | null,
  privacyPolicyUrl: null as string | null,
  termsUrl: null as string | null,
};

export interface PageMeta {
  path: string;
  title: string;
  description: string;
}

export const pageMeta = {
  home: {
    path: '/',
    title: 'Sharely — Your files. Across devices. Instantly.',
    description: site.description,
  },
  download: {
    path: '/download',
    title: 'Download Sharely for Windows, macOS and Linux',
    description:
      'Get Sharely for your computer. Choose your operating system and installer format.',
  },
  install: {
    path: '/install',
    title: 'Install Sharely and send your first file',
    description:
      'Step-by-step setup for Windows, macOS and Linux: install, pair your phone, and transfer.',
  },
} satisfies Record<string, PageMeta>;
