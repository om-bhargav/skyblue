"use client";
import { useEffect, useRef, useState } from "react";

export function useScrollSections(sectionRefs: any[]) {
  const [section, setSection] = useState(1);

  const isLocked = useRef(false);
  const activeIndex = useRef(0);

  const isScrolling = useRef(false);
  const scrollTimeout = useRef<any>(null);

  // 🔥 NEW: find scrollable parent
  const findScrollableParent = (target: EventTarget | null): HTMLElement | null => {
    let el = target as HTMLElement | null;

    while (el && el !== document.body && el !== document.documentElement) {
      const style = window.getComputedStyle(el);

      const isScrollable =
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight;

      if (isScrollable) return el;

      el = el.parentElement;
    }

    return null;
  };

  const changeSection = (dir: "up" | "down") => {
    if (isLocked.current) return;

    setSection((prev) => {
      let next = dir === "down" ? prev + 1 : prev - 1;

      if (next < 1 || next > sectionRefs.length) return prev;

      activeIndex.current = next - 1;
      return next;
    });

    isLocked.current = true;
    setTimeout(() => (isLocked.current = false), 600);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isLocked.current) return;

      if (!isScrolling.current) {
        isScrolling.current = true;

        const currentSection = sectionRefs[activeIndex.current]?.current;
        if (!currentSection) return;

        const direction = e.deltaY > 0 ? "down" : "up";

        // 🔥 NEW: detect actual scrollable element
        const scrollableEl = findScrollableParent(e.target);

        // fallback to section if none
        const el = scrollableEl || currentSection;

        const isScrollable = el.scrollHeight > el.clientHeight;

        const isAtTop = el.scrollTop <= 0;

        const isAtBottom =
          Math.ceil(el.scrollTop + el.clientHeight) >=
          el.scrollHeight - 1;

        // 🔥 NOT scrollable → switch immediately
        if (!isScrollable) {
          changeSection(direction);
        } else {
          // 🔥 scrollable → switch only at boundaries
          if (direction === "down" && isAtBottom) {
            changeSection("down");
          }

          if (direction === "up" && isAtTop) {
            changeSection("up");
          }
        }
      }

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 120);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return { section };
}