<template>
  <component
    :is="tag"
    :class="[
      'col-span-12 h-full',
      m ? `md:col-span-${m}` : '',
      l ? `lg:col-span-${l}` : '',
      mOffset ? `md:col-start-${mOffset + 1}` : '',
      lOffset ? `lg:col-start-${lOffset + 1}` : '',
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag?: string;
  m?: number;
  l?: number;
  mOffset?: number;
  lOffset?: number;
}>();

const tag = props.tag || 'div';
</script>
