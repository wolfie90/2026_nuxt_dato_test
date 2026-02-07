<template>
  <footer class="footer h-full w-full py-12">
    <LayoutGrid>
      <LayoutColumn>
        <p>footer</p>
      </LayoutColumn>
    </LayoutGrid>
  </footer>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore();

let content = computed<any>({
  get: () => globalStore.content as any,
  set: (val: any) => {
    globalStore.setContent(val);
  },
});

onMounted(() => {
  console.log(content.value);
});
</script>
