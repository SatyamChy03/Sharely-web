import { pageMeta } from '../config/site';
import { useMeta } from '../lib/useMeta';
import { CallToAction } from '../sections/CallToAction';
import { Faq } from '../sections/Faq';
import { Features } from '../sections/Features';
import { Hero } from '../sections/Hero';
import { HowItWorks } from '../sections/HowItWorks';
import { PlatformStrip } from '../sections/PlatformStrip';
import { Security } from '../sections/Security';
import { Showcase } from '../sections/Showcase';

export function Home() {
  useMeta(pageMeta.home);
  return (
    <>
      <Hero />
      <PlatformStrip />
      <Features />
      <HowItWorks />
      <Showcase />
      <Security />
      <CallToAction />
      <Faq />
    </>
  );
}
