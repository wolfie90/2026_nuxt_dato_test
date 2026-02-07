<template>
  <div
    :class="[
      'mx-auto grid w-full max-w-[var(--max-width-grid)] flex-1 grid-cols-12 gap-x-6 gap-y-6',
      noMargin ? '' : 'px-6 md:px-16',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  noMargin?: boolean;
}>();
</script>
