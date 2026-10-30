"use client";

import Image from "next/image";
import {useEffect, useId, useRef, useState, type KeyboardEvent, type TouchEvent} from "react";
import {Button} from "@/components/ui/Button";
import {getButtonClasses} from "@/components/ui/buttonStyles";

interface GalleryImage {
  key: string;
  src: string;
  largeSrc: string;
  thumbnailSrc: string;
  alt: string;
  caption?: string;
}

interface EventGalleryCarouselProps {
  images: GalleryImage[];
}

export function EventGalleryCarousel({images}: EventGalleryCarouselProps) {
  const id = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{x: number; y: number} | null>(null);
  const suppressClick = useRef(false);
  const count = images.length;
  const index = count ? selectedIndex % count : 0;
  const image = images[index];
  const position = `Photo ${index + 1} of ${count}`;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    // The native modal makes the rest of the page inert.
    dialog.showModal();
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    const strip = thumbnailsRef.current;
    const thumbnail = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumbnail) return;
    const bounds = strip.getBoundingClientRect();
    const selected = thumbnail.getBoundingClientRect();
    // Scroll only the thumbnail strip, never the event page.
    if (selected.left < bounds.left) strip.scrollLeft -= bounds.left - selected.left;
    else if (selected.right > bounds.right) strip.scrollLeft += selected.right - bounds.right;
  }, [index, isOpen]);

  if (!image) return null;

  function select(nextIndex: number) {
    setSelectedIndex((nextIndex + count) % count);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || count < 2) return;
    let nextIndex: number;
    switch (event.key) {
      case "ArrowLeft": nextIndex = (index - 1 + count) % count; break;
      case "ArrowRight": nextIndex = (index + 1) % count; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = count - 1; break;
      default: return;
    }
    event.preventDefault();
    select(nextIndex);
    if ((event.target as HTMLElement).closest("[data-gallery-thumbnail]")) {
      (thumbnailsRef.current?.children[nextIndex] as HTMLButtonElement | undefined)?.focus({preventScroll: true});
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    suppressClick.current = false;
    touchStart.current = event.touches.length === 1
      ? {x: event.touches[0].clientX, y: event.touches[0].clientY}
      : null;
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") {
      handleKeyDown(event);
      return;
    }
    // Wrap focus at both ends instead of tabbing into the browser chrome.
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.touches.length || !event.changedTouches.length || count < 2) return;
    const deltaX = event.changedTouches[0].clientX - start.x;
    const deltaY = event.changedTouches[0].clientY - start.y;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      suppressClick.current = !isOpen;
      select(index + (deltaX < 0 ? 1 : -1));
    }
  }

  const touchHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: (event: TouchEvent<HTMLElement>) => {
      if (event.touches.length !== 1) touchStart.current = null;
    },
    onTouchEnd: handleTouchEnd,
    onTouchCancel: () => { touchStart.current = null; },
  };

  function navigation() {
    if (count < 2) return null;
    return (
      <div className="flex shrink-0 gap-2">
        <Button type="button" variant="outline" className="px-4" aria-label="Previous photo" onClick={() => select(index - 1)} onKeyDown={handleKeyDown}>
          <span aria-hidden="true">←</span><span className="ml-2">Previous</span>
        </Button>
        <Button type="button" variant="outline" className="px-4" aria-label="Next photo" onClick={() => select(index + 1)} onKeyDown={handleKeyDown}>
          <span className="mr-2">Next</span><span aria-hidden="true">→</span>
        </Button>
      </div>
    );
  }

  return (
    <section className="mt-14 min-w-0" aria-labelledby={`${id}-heading`} aria-roledescription={count > 1 ? "carousel" : undefined}>
      <h2 id={`${id}-heading`} className="text-3xl font-extrabold text-textPrimary">Event gallery</h2>
      <p id={`${id}-help`} className="mt-2 text-sm leading-6 text-textSecondary">
        {count > 1 ? "Browse the photos using the arrows or thumbnails. Select a photo to enlarge it." : "Select the photo to enlarge it."}
      </p>

      <figure className="mt-6">
        <button
          ref={openButtonRef}
          type="button"
          className="relative block aspect-[4/3] w-full touch-pan-y touch-pinch-zoom cursor-zoom-in overflow-hidden rounded-[1.5rem] bg-surface-muted focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-button"
          aria-label={`Enlarge photo ${index + 1}${image.alt ? `: ${image.alt}` : ""}`}
          aria-haspopup="dialog"
          aria-describedby={`${id}-help`}
          onClick={(event) => {
            if (suppressClick.current && event.detail > 0) { suppressClick.current = false; return; }
            suppressClick.current = false;
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          {...touchHandlers}
        >
          <Image key={image.key} src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 800px, (min-width: 1024px) 60vw, 100vw" className="object-contain" />
        </button>
        <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1 basis-40" aria-live={isOpen ? "off" : "polite"} aria-atomic="true">
            <p className="font-bold text-textPrimary">{position}</p>
            {image.caption && <p className="mt-1 text-sm leading-6 break-words text-textSecondary">{image.caption}</p>}
          </div>
          {navigation()}
        </figcaption>
      </figure>

      {count > 1 && (
        <div ref={thumbnailsRef} className="mt-5 flex gap-3 overflow-x-auto p-1 pb-3" role="group" aria-label="Choose an event photo">
          {images.map((item, itemIndex) => (
            <button
              key={item.key}
              type="button"
              data-gallery-thumbnail
              className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-surface-muted focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary-button ${itemIndex === index ? "border-primary-button ring-2 ring-primary-button" : "border-transparent hover:border-primary-button"}`}
              aria-label={`Show photo ${itemIndex + 1}${item.alt ? `: ${item.alt}` : ""}`}
              aria-current={itemIndex === index ? "true" : undefined}
              onClick={() => select(itemIndex)}
              onKeyDown={handleKeyDown}
            >
              <Image src={item.thumbnailSrc} alt="" fill sizes="96px" className="object-contain" />
              <span className="absolute right-0 bottom-0 rounded-tl-md bg-surface px-1.5 text-xs font-bold text-textPrimary" aria-hidden="true">{itemIndex + 1}</span>
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby={`${id}-dialog-title`}
        className="fixed inset-0 m-auto max-h-[96dvh] w-[min(96vw,90rem)] max-w-none overflow-y-auto rounded-2xl border border-border bg-surface p-4 text-textPrimary shadow-2xl backdrop:bg-black/80 sm:p-6"
        onClose={() => {
          setIsOpen(false);
          openButtonRef.current?.focus({preventScroll: true});
        }}
        onKeyDown={handleDialogKeyDown}
      >
        {isOpen && (
          <>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id={`${id}-dialog-title`} className="text-xl font-extrabold">Event gallery</h2>
              <button ref={closeButtonRef} type="button" className={getButtonClasses("outline", "px-4")} onClick={() => dialogRef.current?.close()}>
                Close<span className="ml-2 text-xl" aria-hidden="true">×</span>
              </button>
            </div>
            <figure>
              <div className="relative h-[min(65dvh,60rem)] touch-pan-y touch-pinch-zoom bg-surface-muted" {...touchHandlers}>
                <Image key={image.key} src={image.largeSrc} alt={image.alt} fill sizes="(min-width: 1536px) 1392px, 96vw" className="object-contain" />
              </div>
              <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1 basis-40" role="status" aria-atomic="true">
                  <p className="font-bold">{position}</p>
                  {image.caption && <p className="mt-1 text-sm leading-6 break-words text-textSecondary">{image.caption}</p>}
                </div>
                {navigation()}
              </figcaption>
            </figure>
          </>
        )}
      </dialog>
    </section>
  );
}
