import { facts } from '../config/facts';
import { desktopPlatforms, mobilePlatforms } from '../config/platforms';
import { release } from '../config/release';
import { listWithAnd } from '../lib/format';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

function supportedPlatformsAnswer(): string {
  const released = desktopPlatforms
    .filter((platform) => platform.status === 'released')
    .map((platform) => platform.name);
  const planned = desktopPlatforms
    .filter((platform) => platform.status === 'planned')
    .map((platform) => platform.name);
  const phones = mobilePlatforms.map((platform) => platform.name);

  const sentences: string[] = [];
  if (released.length) sentences.push(`Sharely is available for ${listWithAnd(released)}.`);
  if (planned.length) {
    sentences.push(
      released.length
        ? `Builds for ${listWithAnd(planned)} are planned.`
        : `The first builds are planned for ${listWithAnd(planned)}.`,
    );
  }
  if (phones.length) {
    sentences.push(`On your phone, you'll use the Sharely app for ${listWithAnd(phones)}.`);
  }
  sentences.push('The download page always shows exactly which builds are published.');
  return sentences.join(' ');
}

function internetAnswer(): string {
  switch (facts.networkRequirement) {
    case 'none':
      return 'No. Sharely works without an internet connection.';
    case 'local-network':
      return 'Your devices need to be on the same local network (for example the same Wi-Fi). An internet connection is not required for transfers.';
    case 'internet':
      return 'Yes. Both devices need an internet connection to transfer files.';
    default:
      return "We'll document exact network requirements with the first public release. Until then, keeping both devices on the same Wi-Fi is the simplest setup.";
  }
}

function savedFilesAnswer(): string {
  return facts.defaultSaveFolder
    ? `By default, in ${facts.defaultSaveFolder}. You can choose a different folder in Settings → Transfer.`
    : 'You choose the download folder in Settings → Transfer. Each received file in Activity also has a "Show in folder" shortcut.';
}

function pricingAnswer(): string {
  if (facts.isFree === true) return 'Yes, Sharely is free to download and use.';
  if (facts.isFree === false) return 'Sharely is a paid app. Pricing is shown on the download page.';
  return 'Pricing will be announced with the first public release.';
}

function updateAnswer(): string {
  if (facts.updates) return facts.updates;
  const changelogHint = release.changelogUrl
    ? ' The changelog lists what changed in each release.'
    : '';
  return `Download the latest version from the download page and install it over your current one.${changelogHint}`;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'what',
    question: 'What is Sharely?',
    answer:
      'Sharely is an app for moving files between your phone and your computer. Install it on both, pair them once, then send photos, videos, documents and folders in either direction.',
  },
  {
    id: 'platforms',
    question: 'Which operating systems are supported?',
    answer: supportedPlatformsAnswer(),
  },
  {
    id: 'connect',
    question: 'How do I connect my phone to my laptop?',
    answer: `Open Sharely on both devices. ${facts.pairing} The installation guide walks through it step by step.`,
  },
  {
    id: 'both-ways',
    question: 'Can I send files in both directions?',
    answer:
      'Yes. Send from your phone to your computer, or drag files onto Sharely on your computer to send them to your phone.',
  },
  {
    id: 'internet',
    question: 'Does Sharely require an internet connection?',
    answer: internetAnswer(),
  },
  {
    id: 'saved',
    question: 'Where are received files saved?',
    answer: savedFilesAnswer(),
  },
  {
    id: 'trouble',
    question: 'What should I do if my devices cannot connect?',
    answer:
      'Check that both devices are on the same network and that Sharely is open on each. If you paired with a code, generate a new one — codes expire after a few minutes. Still stuck? The installation guide has a troubleshooting section for each platform.',
  },
  {
    id: 'free',
    question: 'Is Sharely free?',
    answer: pricingAnswer(),
  },
  {
    id: 'update',
    question: 'How do I update Sharely?',
    answer: updateAnswer(),
  },
];
