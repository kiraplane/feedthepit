'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ExternalLinkIcon,
  Maximize2Icon,
  Minimize2Icon,
  PlayIcon,
  RotateCcwIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

type FalseSunGameFrameProps = {
  src: string;
  posterSrc: string;
  labels: {
    title: string;
    loading: string;
    start: string;
    reset: string;
    fullscreen: string;
    exitFullscreen: string;
    open: string;
  };
  className?: string;
};

function shouldOpenDirectlyForMobileFullscreen() {
  const userAgent = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(userAgent);
  const isSmallTouchScreen =
    navigator.maxTouchPoints > 0 &&
    window.matchMedia('(max-width: 767px)').matches;

  return isIOS || isAndroid || isSmallTouchScreen;
}

function getFrameDocument(frame: HTMLIFrameElement | null) {
  try {
    return frame?.contentDocument ?? null;
  } catch {
    return null;
  }
}

export function FalseSunGameFrame({
  src,
  posterSrc,
  labels,
  className,
}: FalseSunGameFrameProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [frameKey, setFrameKey] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [showWarmup, setShowWarmup] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openDirectForFullscreen, setOpenDirectForFullscreen] = useState(false);

  const syncFullscreenState = useCallback(() => {
    const childDocument = getFrameDocument(iframeRef.current);
    setIsFullscreen(
      document.fullscreenElement === stageRef.current ||
        document.fullscreenElement === iframeRef.current ||
        Boolean(childDocument?.fullscreenElement)
    );
  }, []);

  useEffect(() => {
    const shouldOpenDirect = shouldOpenDirectlyForMobileFullscreen();
    setOpenDirectForFullscreen(shouldOpenDirect);
    setCanFullscreen(Boolean(document.fullscreenEnabled) || shouldOpenDirect);

    document.addEventListener('fullscreenchange', syncFullscreenState);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
    };
  }, [syncFullscreenState]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    setShowWarmup(true);
    const timer = window.setTimeout(() => setShowWarmup(false), 1800);

    return () => window.clearTimeout(timer);
  }, [frameKey, hasStarted]);

  const openGameDirectly = useCallback(() => {
    const opened = window.open(src, '_blank', 'noopener,noreferrer');

    if (!opened) {
      window.location.href = src;
    }
  }, [src]);

  const restartFrame = () => {
    if (!hasStarted) {
      return;
    }

    setFrameKey((current) => current + 1);
  };

  const startGame = () => {
    setHasStarted(true);
  };

  const toggleFullscreen = async () => {
    if (!hasStarted) {
      return;
    }

    if (openDirectForFullscreen) {
      openGameDirectly();
      return;
    }

    if (!stageRef.current || !iframeRef.current || !canFullscreen) {
      return;
    }

    const childDocument = getFrameDocument(iframeRef.current);

    if (document.fullscreenElement || childDocument?.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await stageRef.current.requestFullscreen();
    syncFullscreenState();
  };

  const handleFrameLoad = () => {
    setShowWarmup(false);
    const childDocument = getFrameDocument(iframeRef.current);
    childDocument?.addEventListener('fullscreenchange', syncFullscreenState);
  };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-[#493A34] bg-black shadow-2xl shadow-black/35',
        className
      )}
    >
      <div
        ref={stageRef}
        className="relative aspect-video min-h-[280px] w-full overflow-hidden bg-black sm:min-h-[380px] lg:min-h-[620px]"
      >
        {hasStarted ? (
          <iframe
            ref={iframeRef}
            key={frameKey}
            title="The False Sun online game"
            src={src}
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full border-0 bg-black"
            onLoad={handleFrameLoad}
          />
        ) : (
          <div className="absolute inset-0">
            <Image
              src={posterSrc}
              alt="The False Sun online game splash screen"
              fill
              priority
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,12,0.22)_0%,rgba(10,15,12,0.78)_70%,rgba(10,15,12,0.95)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="max-w-2xl rounded-lg border border-[#E7C77C]/35 bg-[#0A0F0C]/88 p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#D9B56A]">
                  Mature game
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#F7E8C9] md:text-3xl">
                  The False Sun is intended for adult players
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#D5C5AF]">
                  This game includes mature visual novel themes, disturbing
                  scenes, flashing effects, and sudden audio.
                </p>
                <Button
                  type="button"
                  className="mt-5 bg-[#D9B56A] text-[#15110B] hover:bg-[#E7C77C]"
                  onClick={startGame}
                >
                  <PlayIcon className="size-4" />
                  {labels.start}
                </Button>
              </div>
            </div>
          </div>
        )}

        {showWarmup ? (
          <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/80 text-sm font-medium text-[#F7E8C9]">
            <span className="rounded-md border border-[#E7C77C]/30 bg-[#111612] px-3 py-2">
              {labels.loading}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-[#493A34] border-t bg-[#111612] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2 text-sm text-[#D5C5AF]">
          <span
            className="size-2 shrink-0 rounded-full bg-[#D9B56A]"
            aria-hidden
          />
          <span className="truncate">{labels.title}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 text-[#D5C5AF] hover:bg-white/10 hover:text-white"
            title={labels.reset}
            aria-label={labels.reset}
            disabled={!hasStarted}
            onClick={restartFrame}
          >
            <RotateCcwIcon className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 text-[#D5C5AF] hover:bg-white/10 hover:text-white"
            title={
              openDirectForFullscreen
                ? labels.open
                : isFullscreen
                  ? labels.exitFullscreen
                  : labels.fullscreen
            }
            aria-label={
              openDirectForFullscreen
                ? labels.open
                : isFullscreen
                  ? labels.exitFullscreen
                  : labels.fullscreen
            }
            disabled={!hasStarted || !canFullscreen}
            onClick={() => {
              toggleFullscreen().catch(() => {
                if (openDirectForFullscreen) {
                  openGameDirectly();
                  return;
                }

                setCanFullscreen(false);
              });
            }}
          >
            {isFullscreen ? (
              <Minimize2Icon className="size-4" />
            ) : (
              <Maximize2Icon className="size-4" />
            )}
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-9 text-[#D5C5AF] hover:bg-white/10 hover:text-white"
            title={labels.open}
            aria-label={labels.open}
          >
            <a href={src} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
