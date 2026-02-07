// @ts-nocheck
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Lenis from 'lenis';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    smooth: true,
    lerp: 0.08,
  });

  // Use the html element as the scroller for ScrollTrigger + Lenis
  const scroller = document.documentElement;
  ScrollTrigger.defaults({ scroller });

  // Keep ScrollTrigger in sync with Lenis
  lenis.on('scroll', () => ScrollTrigger.update());

  // Proxy scroll methods so ScrollTrigger reads/writes through Lenis
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return window.scrollY || window.pageYOffset;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: 'transform',
  });

  // Drive Lenis off GSAP's ticker
  const onTick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  // Recalculate on refresh (after layout/image changes)
  const onRefresh = () => lenis.resize();
  ScrollTrigger.addEventListener('refresh', onRefresh);
  ScrollTrigger.refresh();

  // Expose instance
  nuxtApp.provide('lenis', lenis);

  // Cleanup
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      lenis.destroy();
    });
  }

  nuxtApp.hook('app:mounted', () => {
    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
    });
  });
});
