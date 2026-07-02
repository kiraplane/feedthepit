import type { Locale } from 'next-intl';
import { featuredGuides, getGuide, guides, siteDescription } from './guides';
import { gameFacts, keywordMatrix, siteFacts } from './sources';
import type { GameFact, Guide, GuideFaq } from './types';

export interface HomeLinkCopy {
  title: string;
  body: string;
}

export interface HomeContent {
  badge: string;
  metadataTitle: string;
  title: string;
  intro: string;
  primaryCta: string;
  playCta: string;
  steamCta: string;
  scopeNote: string;
  siteShapeEyebrow: string;
  siteShapeTitle: string;
  siteShapeBody: string;
  systemsEyebrow: string;
  systemsTitle: string;
  systemsBody: string;
  coreGuidesEyebrow: string;
  coreGuidesTitle: string;
  allGuidesButton: string;
  currentFactsTitle: string;
  findPageTitle: string;
  primaryLinks: {
    play: HomeLinkCopy;
    beginner: HomeLinkCopy;
    cards: HomeLinkCopy;
    monsters: HomeLinkCopy;
    steam: HomeLinkCopy;
  };
  secondaryLinks: {
    walkthrough: HomeLinkCopy;
    actOne: HomeLinkCopy;
    download: HomeLinkCopy;
    discord: HomeLinkCopy;
  };
  routeLabels: Record<string, string>;
  coreRouteItems: Array<{
    keyword: string;
    route: string;
    label: string;
    intent: string;
  }>;
  faq: GuideFaq[];
}

export interface GuidesIndexContent {
  badge: string;
  title: string;
  intro: string;
  readGuide: string;
  faq: GuideFaq[];
}

export interface GuideArticleUi {
  sectionsTitle: string;
  videoPrefix: string;
  videoSuffix: string;
  officialTitle: string;
  officialBody: string;
  officialLinkLabel: string;
  relatedTitle: string;
  faqTitle: string;
  categoryLabels: Record<Guide['category'], string>;
  difficultyLabels: Record<Guide['difficulty'], string>;
}

export interface PlayOnlineContent {
  metadataTitle: string;
  metadataDescription: string;
  badge: string;
  title: string;
  intro: string;
  beginnerButton: string;
  steamButton: string;
  frameLabels: {
    title: string;
    loading: string;
    start: string;
    reset: string;
    fullscreen: string;
    exitFullscreen: string;
    open: string;
  };
  infoCards: Array<{
    key: string;
    title: string;
    body: string;
  }>;
  downloadGuide: string;
  officialItch: string;
  howEyebrow: string;
  howTitle: string;
  howBody: string;
  howCards: Array<{
    label: string;
    body: string;
  }>;
  media: {
    eyebrow: string;
    title: string;
    body: string;
    screenshots: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
    video: {
      id: string;
      title: string;
      caption: string;
    };
  };
  afterEyebrow: string;
  afterTitle: string;
  guideLinks: Array<{
    title: string;
    href: string;
    body: string;
    icon: 'cards' | 'book' | 'monster';
  }>;
  faq: GuideFaq[];
}

export function getFeedLocale(_locale?: Locale | string) {
  return 'en';
}

export function getLocalizedGuide(slug: string, _locale?: Locale | string) {
  return getGuide(slug);
}

export function getLocalizedGuides(_locale?: Locale | string) {
  return guides;
}

export function getLocalizedFeaturedGuides(_locale?: Locale | string) {
  return featuredGuides;
}

export function getLocalizedSiteDescription(_locale?: Locale | string) {
  return siteDescription;
}

export function getLocalizedGameFacts(_locale?: Locale | string): GameFact[] {
  return gameFacts;
}

export function getHomeContent(_locale?: Locale | string): HomeContent {
  const coreRouteItems = keywordMatrix
    .filter((item) => item.status === 'keep')
    .slice(0, 12)
    .map((item) => ({
      keyword: item.keyword,
      route: item.route,
      label: routeLabels[item.route] ?? item.route,
      intent: item.intent,
    }));

  return {
    badge: 'Independent Feed The Pit wiki',
    metadataTitle:
      'Feed The Pit Wiki - Guides, Cards, Monsters and Play Online',
    title: 'Feed The Pit',
    intro:
      'Guide hub for the investigative horror game: cards, monsters, walkthrough, endings, achievements, Steam setup, safe downloads, and browser play.',
    primaryCta: 'Start the beginner guide',
    playCta: 'Play online',
    steamCta: 'Steam page',
    scopeNote:
      'Use Steam for the PC story campaign and play-online when you want a quick browser session.',
    siteShapeEyebrow: 'Launch coverage',
    siteShapeTitle: 'Built around what players search first',
    siteShapeBody:
      'The launch page set covers wiki, guide, play online, Steam, download, cards, monsters, walkthrough, ending, achievements, Discord, and rendering-fix demand without inventing codes or tier lists.',
    systemsEyebrow: 'Investigation loop',
    systemsTitle: 'Cards narrow the target while the monster rewrites the risk',
    systemsBody:
      'Feed The Pit is strongest when you treat every mission as two puzzles at once: ask better card questions, then survive the mission monster long enough to act on the answer.',
    coreGuidesEyebrow: 'Core guides',
    coreGuidesTitle: 'Choose the page by the problem in front of you',
    allGuidesButton: 'All guides',
    currentFactsTitle: 'Current official snapshot',
    findPageTitle: 'Keyword and page map',
    primaryLinks: {
      play: {
        title: 'Play Online',
        body: 'Start a quick browser run and keep the Steam story campaign separate.',
      },
      beginner: {
        title: 'Beginner Guide',
        body: 'Start with spoiler-light card, monster, item, and rank advice.',
      },
      cards: {
        title: 'Cards',
        body: 'Use magical card questions to narrow Carrister Valley without wasting your hand.',
      },
      monsters: {
        title: 'Monsters',
        body: 'Read each mission nemesis as a behavior puzzle before spending items.',
      },
      steam: {
        title: 'Steam',
        body: 'Check release date, current story status, Vulkan requirements, and future update notes.',
      },
    },
    secondaryLinks: {
      walkthrough: {
        title: 'Walkthrough',
        body: 'Use a spoiler-light route before opening ending pages.',
      },
      actOne: {
        title: 'Act 1',
        body: 'Understand the current launch boundary and what future acts may change.',
      },
      download: {
        title: 'Download',
        body: 'Use trusted play paths and avoid APKs, cracks, and fake fixes.',
      },
      discord: {
        title: 'Discord',
        body: 'Find official community paths and ask better technical support questions.',
      },
    },
    routeLabels,
    coreRouteItems,
    faq: [
      {
        question: 'Is this an official Feed The Pit website?',
        answer:
          'No. It is an independent guide hub. Use Steam and Curious Fox Sox channels for official game updates.',
      },
      {
        question: 'Can I play Feed The Pit online here?',
        answer:
          'Yes. The play-online page lets you start a browser version directly, while the Steam page points PC players to the story campaign.',
      },
      {
        question: 'Why is the browser game different from Steam?',
        answer:
          'The Steam game is a story-driven investigative horror release. The browser version is a shorter dark incremental experience with the same title.',
      },
      {
        question: 'Are there Feed The Pit codes or a tier list?',
        answer:
          'No reliable code system or stable tier-list demand was found. The site focuses on cards, monsters, walkthroughs, achievements, platform, and safety pages.',
      },
    ],
  };
}

export function getGuidesIndexContent(
  _locale?: Locale | string
): GuidesIndexContent {
  return {
    badge: 'Feed The Pit guides',
    title: 'Feed The Pit Guide Hub',
    intro:
      'Choose a guide by intent: beginner route, play online, cards, monsters, Act 1 walkthrough, ending help, achievements, rendering fixes, Steam, downloads, Discord, or mobile safety.',
    readGuide: 'Read guide',
    faq: [
      {
        question: 'Which Feed The Pit guide should I read first?',
        answer:
          'Start with the beginner guide, then move to cards or monsters depending on whether the map logic or survival pressure is blocking you.',
      },
      {
        question: 'Are these guides for Steam or browser play?',
        answer:
          'Most guides cover the Steam Act 1 story campaign. The play-online and browser-version pages focus on the shorter browser experience.',
      },
      {
        question: 'Will you add monster or card databases?',
        answer:
          'Only when stable Act 1 data supports them. At launch, decision guides are safer than thin tables.',
      },
    ],
  };
}

export function getGuideArticleUi(_locale?: Locale | string): GuideArticleUi {
  return {
    sectionsTitle: 'Sections',
    videoPrefix: 'Walkthrough cross-check:',
    videoSuffix: 'use it as a supporting watch link.',
    officialTitle: 'Official links',
    officialBody:
      'Use Steam for the Act 1 story campaign and the play-online page for a quick browser session.',
    officialLinkLabel: 'Open official Steam page',
    relatedTitle: 'Related pages',
    faqTitle: 'FAQ',
    categoryLabels: {
      Start: 'Start',
      Mechanics: 'Mechanics',
      Walkthrough: 'Walkthrough',
      Browser: 'Browser',
      Official: 'Official',
      Safety: 'Safety',
    },
    difficultyLabels: {
      Beginner: 'Beginner',
      Intermediate: 'Intermediate',
      Advanced: 'Advanced',
      Status: 'Status',
    },
  };
}

export function getPlayOnlineContent(_locale?: Locale | string) {
  return playOnlineContent;
}

export const routeLabels: Record<string, string> = {
  '/': 'Feed The Pit Wiki',
  '/play-online': 'Play Feed The Pit Online',
  '/guides': 'Guide Hub',
  '/guides/beginner-guide': 'Beginner Guide',
  '/cards': 'Cards Guide',
  '/monsters': 'Monsters Guide',
  '/walkthrough': 'Walkthrough',
  '/guides/act-1-walkthrough': 'Act 1 Walkthrough',
  '/guides/ending-guide': 'Ending Guide',
  '/guides/achievements': 'Achievements',
  '/guides/rendering-fixes': 'Rendering Fixes',
  '/steam': 'Steam Guide',
  '/download': 'Download Guide',
  '/itch-io': 'Browser Version',
  '/discord': 'Discord Guide',
  '/mobile': 'Mobile and APK Safety',
  '/disclaimer': 'Disclaimer',
};

const playOnlineContent: PlayOnlineContent = {
  metadataTitle: 'Feed The Pit Play Online - Browser Game',
  metadataDescription:
    'Play Feed The Pit in your browser, learn the 3-layer incremental loop, and understand when to switch to the Steam Act 1 campaign.',
  badge: 'Play in browser',
  title: 'Feed The Pit Play Online',
  intro:
    'Start a short browser run, then use the notes below to understand offerings, layers, saves, screenshots, and when the Steam campaign is the better next step.',
  beginnerButton: 'Beginner guide',
  steamButton: 'Steam guide',
  frameLabels: {
    title: `${siteFacts.gameName} online`,
    loading: 'Loading Feed The Pit...',
    start: 'Run game',
    reset: 'Reload game',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    open: 'Open direct',
  },
  infoCards: [
    {
      key: 'play',
      title: 'Instant play',
      body: 'Start in the browser, read each request from the pit, and build toward the next layer.',
    },
    {
      key: 'steam',
      title: 'Steam version',
      body: 'Choose Steam when you want the PC story campaign with investigation cards, monsters, achievements, and future acts.',
    },
    {
      key: 'saves',
      title: 'Protect browser progress',
      body: 'HTML5 browser games rely on local browser data. Private windows, cache cleanup, or strict storage settings can reset progress.',
    },
  ],
  downloadGuide: 'Read safe download guide',
  officialItch: 'Open official itch.io page',
  howEyebrow: 'How to play',
  howTitle: 'Feed the pit, read the request, then build for the next layer',
  howBody:
    'The browser version is short and focused. It works best when you read the pit request, buy the building that solves the current wait, and listen for the next escalation instead of clicking every upgrade blindly.',
  howCards: [
    {
      label: 'Start with grain',
      body: 'Let the first loop teach the timing. The pit rewards offerings, but each reward creates a stronger next request.',
    },
    {
      label: 'Build for delay',
      body: 'Farms, shrines, candle rings, winches, and other upgrades matter when they shorten the wait blocking the next offering.',
    },
    {
      label: 'Read the pit',
      body: 'The text is part of the game. The mood and requests explain why the upgrade tree keeps becoming more costly.',
    },
    {
      label: 'Descend by layers',
      body: 'The itch page describes 3 layers and an ending at THE RED. Treat each layer as a new resource and tone shift.',
    },
    {
      label: 'Use headphones',
      body: 'The sound design helps the browser run feel less like a plain clicker, so headphones are worth using.',
    },
    {
      label: 'Choose the right mode',
      body: 'Switch to Steam when you want the full PC story campaign instead of a short browser run.',
    },
  ],
  media: {
    eyebrow: 'Browser screenshots',
    title: 'What the browser game looks like',
    body: 'These screenshots show the short dark incremental loop on the play-online page. The trailer below shows the Steam Act 1 mood, so you can choose the right way to play next.',
    screenshots: [
      {
        src: '/feedthepit/itch/feed-the-pit-browser-layer-one.png',
        alt: 'Feed The Pit browser early offering screen',
        caption:
          'The browser run starts with simple offerings and makes the pit feel present immediately.',
      },
      {
        src: '/feedthepit/itch/feed-the-pit-browser-layer-two.png',
        alt: 'Feed The Pit browser with village upgrades',
        caption:
          'Buildings turn the waiting loop into a management problem as the village grows.',
      },
      {
        src: '/feedthepit/itch/feed-the-pit-browser-layer-three.png',
        alt: 'Feed The Pit browser deeper layer screenshot',
        caption:
          'Later layers lean harder into the moral-cost upgrade tree described on itch.io.',
      },
    ],
    video: {
      id: 'tE6LWsWcoJ4',
      title: 'Feed The Pit - Act 1 Trailer',
      caption: 'Act 1 trailer for the Steam story campaign.',
    },
  },
  afterEyebrow: 'Next steps',
  afterTitle: 'Choose the right Feed The Pit path',
  guideLinks: [
    {
      title: 'Beginner Guide',
      href: '/guides/beginner-guide',
      body: 'Start Steam Act 1 with card and monster fundamentals.',
      icon: 'book',
    },
    {
      title: 'Cards Guide',
      href: '/cards',
      body: 'Narrow the map without wasting a limited hand.',
      icon: 'cards',
    },
    {
      title: 'Monsters Guide',
      href: '/monsters',
      body: 'Read mission threats before spending items.',
      icon: 'monster',
    },
    {
      title: 'Steam Guide',
      href: '/steam',
      body: 'Check the official Act 1 release, platform, and Vulkan notes.',
      icon: 'book',
    },
  ],
  faq: [
    {
      question: 'Is the online version free?',
      answer:
        'You can start the browser version here. Use Steam when you want the full PC story campaign.',
    },
    {
      question: 'Can I fullscreen the game?',
      answer:
        'Yes. Use the fullscreen button in the toolbar. On some mobile browsers, opening the game directly may be more reliable.',
    },
    {
      question: 'Does this page bypass official platforms?',
      answer:
        'No. It gives players a browser play option and points PC players toward Steam for the story campaign.',
    },
  ],
};
