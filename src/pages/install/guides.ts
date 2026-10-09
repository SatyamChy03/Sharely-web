import { getDesktopPlatform, type DesktopPlatformId } from '../../config/platforms';
import { release, versionLabel } from '../../config/release';
import type { GuideSection, GuideStep } from './guideTypes';
import {
  COMMON_TROUBLESHOOTING_STEPS,
  CONNECT_PHONE_SECTION,
  SEND_FIRST_FILE_SECTION,
} from './sharedSections';

// File names follow the app's release workflow: sharely-<tag>-<platform>.<ext>.
const windowsZipName = release.assets.windowsZip?.fileName ?? `sharely-${versionLabel}-windows.zip`;
const linuxDebName = release.assets.linuxDeb?.fileName ?? `sharely-${versionLabel}-linux-amd64.deb`;
const linuxTarName = release.assets.linuxTar?.fileName ?? `sharely-${versionLabel}-linux-x64.tar.gz`;
/** The archive unpacks into a folder named without the tag's leading "v". */
const linuxTarFolder = `sharely-${versionLabel.replace(/^v/, '')}-linux-x64`;

function windowsGuide(): GuideSection[] {
  return [
    {
      id: 'download',
      title: 'Download',
      steps: [
        {
          title: 'Get the app',
          body: 'On the download page, choose Windows and click "Download for Windows". The file is saved to your Downloads folder.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Install',
      steps: [
        {
          title: 'Unzip the download',
          body: `Right-click ${windowsZipName} in Downloads and choose Extract All. Pick a folder you will keep, such as Documents\\Sharely.`,
          note: 'Keep all the extracted files together. sharely.exe needs the files next to it.',
        },
        {
          title: 'If Windows shows a warning',
          body: 'If SmartScreen says "Windows protected your PC", check that you downloaded the file from this site\'s download page, then choose More info → Run anyway.',
        },
      ],
    },
    {
      id: 'first-launch',
      title: 'First launch',
      steps: [
        {
          title: 'Open Sharely',
          body: 'Double-click sharely.exe in the folder you extracted. You will see the pairing screen. To find it again quickly, right-click sharely.exe and choose Pin to Start.',
        },
        {
          title: 'Allow network access',
          body: 'If Windows Defender Firewall asks, allow Sharely on Private networks so your phone can reach it.',
        },
      ],
    },
    CONNECT_PHONE_SECTION,
    SEND_FIRST_FILE_SECTION,
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      steps: [
        ...COMMON_TROUBLESHOOTING_STEPS,
        {
          title: 'Firewall blocked the connection',
          body: 'Open Windows Security → Firewall & network protection → Allow an app through firewall, and make sure Sharely is allowed on Private networks.',
        },
      ],
    },
  ];
}

function macosGuide(): GuideSection[] {
  return [
    {
      id: 'download',
      title: 'Download',
      steps: [
        {
          title: 'Get the disk image',
          body: 'On the download page, choose macOS and click "Download for macOS".',
        },
      ],
    },
    {
      id: 'install',
      title: 'Install',
      steps: [
        { title: 'Open the .dmg', body: 'Double-click the Sharely disk image in Downloads.' },
        {
          title: 'Move to Applications',
          body: 'Drag Sharely onto the Applications folder, then eject the disk image.',
        },
      ],
    },
    {
      id: 'first-launch',
      title: 'First launch',
      steps: [
        { title: 'Open Sharely', body: 'Open Sharely from Applications or Spotlight.' },
        {
          title: 'If macOS blocks it',
          body: 'If macOS says it cannot verify the app, open System Settings → Privacy & Security and choose Open Anyway.',
        },
        {
          title: 'Allow local network access',
          body: 'If macOS asks whether Sharely can find devices on your local network, choose Allow.',
        },
      ],
    },
    CONNECT_PHONE_SECTION,
    SEND_FIRST_FILE_SECTION,
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      steps: [
        ...COMMON_TROUBLESHOOTING_STEPS,
        {
          title: 'Local network permission was denied',
          body: 'Open System Settings → Privacy & Security → Local Network and switch Sharely on.',
        },
      ],
    },
  ];
}

/** One install step per Linux package the download page offers. */
function linuxInstallSteps(): GuideStep[] {
  const offeredFormats = getDesktopPlatform('linux').formats.map((format) => format.id);
  const steps: GuideStep[] = [];
  if (offeredFormats.includes('linux-deb')) {
    steps.push({
      title: 'Debian package (Ubuntu, Debian, Mint, Pop!_OS)',
      body: 'Install with apt so dependencies are resolved automatically.',
      code: `sudo apt install ./${linuxDebName}`,
    });
  }
  if (offeredFormats.includes('linux-tar')) {
    steps.push({
      title: 'Portable archive (other distributions)',
      body: 'Unpack the archive anywhere, then run Sharely from the folder. No installation needed.',
      code: `tar -xzf ${linuxTarName}\n./${linuxTarFolder}/sharely`,
      note: 'Sharely needs GTK 3 and libsecret, which most desktops already have. It keeps its pairing keys in your desktop keyring, such as GNOME Keyring.',
    });
  }
  return steps;
}

function linuxGuide(): GuideSection[] {
  return [
    {
      id: 'download',
      title: 'Download',
      steps: [
        {
          title: 'Pick a package',
          body: 'On the download page, choose Linux and the package that matches your distribution. If unsure, use the portable archive.',
        },
      ],
    },
    { id: 'install', title: 'Install', steps: linuxInstallSteps() },
    {
      id: 'first-launch',
      title: 'First launch',
      steps: [
        {
          title: 'Open Sharely',
          body: 'Launch Sharely from your applications menu, or run sharely from the unpacked folder. You will see the pairing screen.',
        },
      ],
    },
    CONNECT_PHONE_SECTION,
    SEND_FIRST_FILE_SECTION,
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      steps: [
        ...COMMON_TROUBLESHOOTING_STEPS,
        {
          title: 'A firewall is blocking Sharely',
          body: 'If you use ufw or firewalld, allow Sharely to accept connections on your local network, then restart the app.',
        },
      ],
    },
  ];
}

const GUIDES: Record<DesktopPlatformId, () => GuideSection[]> = {
  windows: windowsGuide,
  macos: macosGuide,
  linux: linuxGuide,
};

export const getInstallGuide = (platformId: DesktopPlatformId): GuideSection[] =>
  GUIDES[platformId]();
