import { FalseSunPlayOnlinePage } from '@/components/falsesun/play-online-page';
import { siteFacts } from '@/data/falsesun/sources';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Play The False Sun Online - Browser Game and Walkthrough',
    description:
      'Play The False Sun online, then use walkthrough guides for all endings, Ending 20, routes, mini-games, and downloads.',
    locale,
    pathname: '/play-online',
    image: siteFacts.officialHeroImage,
  });
}

export default function PlayOnlinePage() {
  return <FalseSunPlayOnlinePage />;
}
