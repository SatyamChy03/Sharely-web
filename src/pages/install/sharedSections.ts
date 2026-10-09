import { facts } from '../../config/facts';
import type { GuideSection, GuideStep } from './guideTypes';

// Steps that are the same whichever computer Sharely runs on.

export const CONNECT_PHONE_SECTION: GuideSection = {
  id: 'connect',
  title: 'Connect your phone',
  steps: [
    {
      title: 'Install the phone app',
      body: 'Get Sharely for your phone from the download page and open it.',
      note: 'The Android app is an APK file, so Android asks you to allow installs from your browser the first time.',
    },
    {
      title: 'Show the pairing code',
      body: 'On your computer, open Sharely. The first launch shows a QR code and a 6-digit code. Later, find them under Devices → Add device.',
    },
    {
      title: 'Pair',
      body: `On your phone, tap "Connect your laptop". ${facts.pairing}`,
      note: 'Codes expire after a few minutes. If one stops working, the screen shows a fresh one.',
    },
    {
      title: 'Confirm',
      body: 'Both screens show "Connected" with the other device\'s name. You only need to pair once.',
    },
  ],
};

export const SEND_FIRST_FILE_SECTION: GuideSection = {
  id: 'send',
  title: 'Send your first file',
  steps: [
    {
      title: 'From your computer',
      body: 'Drag a file onto the Home screen, or click Choose files. It goes to your connected phone.',
    },
    {
      title: 'From your phone',
      body: 'Tap Photos, Files, Links or Clipboard, pick what to send, choose your computer and tap Send.',
    },
    {
      title: 'Accept and find it',
      body: 'The receiving device asks before saving. Accept, then open the file from Activity or the Receive page.',
    },
  ],
};

export const COMMON_TROUBLESHOOTING_STEPS: GuideStep[] = [
  {
    title: "Devices can't find each other",
    body: 'Put both devices on the same Wi-Fi network and keep Sharely open on each. Guest and public networks sometimes block devices from seeing each other.',
  },
  {
    title: 'The pairing code is rejected',
    body: 'The code may have expired. Use the new code shown on your computer, or scan the QR code instead.',
  },
  {
    title: 'A transfer stopped part-way',
    body: 'If one device sleeps or leaves the network, the transfer pauses as "Interrupted". Reconnect and choose Resume or Retry.',
  },
];
