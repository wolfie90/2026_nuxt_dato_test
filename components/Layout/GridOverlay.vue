<template>
  <div v-if="visible" class="pointer-events-none fixed top-0 left-0 z-[9999] h-full w-full">
    <div class="relative mx-auto h-full w-full max-w-[var(--max-width-grid)]">
      <div class="flex h-full">
        <div class="grid h-full flex-1 grid-cols-3 gap-6 px-6 md:grid-cols-12 md:px-16">
          <div v-for="n in isMobile ? 3 : 12" :key="n" class="bg-red-500/20"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(false);
const isMobile = ref(false);

const isProduction = process.env.NODE_ENV === 'production';

const toggleOverlay = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === '.') {
    e.preventDefault();
    visible.value = !visible.value;
  }
};

const onWindowResize = () => {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches;
};

onMounted(() => {
  if (isProduction) return;

  onWindowResize();

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('keydown', toggleOverlay);
});

onBeforeUnmount(() => {
  if (isProduction) return;

  window.removeEventListener('keydown', toggleOverlay);
  window.removeEventListener('resize', onWindowResize);
});
</script>
