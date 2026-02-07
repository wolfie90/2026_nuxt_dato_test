/**
 * useViewport()
 * ---------------------------------------------
 * Usage inside a component:
 *
 * <script setup>
 * const { isMobile, isTablet, isDesktop } = useViewport()
 * </script>
 *
 * <template>
 *   <div v-if="isMobile">Mobile layout</div>
 *   <div v-else-if="isTablet">Tablet layout</div>
 *   <div v-else>Desktop layout</div>
 * </template>
 */

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);

export const useViewport = () => {
  const isMobile = breakpoints.smaller('md'); // < md
  const isTablet = breakpoints.between('md', 'lg'); // >= md && < lg
  const isDesktop = breakpoints.greaterOrEqual('lg'); // >= lg

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoints,
  };
};
