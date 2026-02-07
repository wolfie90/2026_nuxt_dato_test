<template>
  <div class="language-switch">
    <span class="language-switch__label">{{ $t('language.switch') }}:</span>
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="getLocalePath(locale.code)"
      :class="[
        'language-switch__link',
        { 'language-switch__link--active': locale.code === currentLocale },
      ]"
    >
      {{ locale.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale: currentLocale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const alternateLocales = useAlternateLocales();
const localePath = useLocalePath();

const availableLocales = computed(() => locales.value.filter((l) => typeof l !== 'string'));

const getLocalePath = (localeCode: string) => {
  const alternatePath = alternateLocales.value[localeCode];
  if (alternatePath) {
    return localePath(alternatePath, localeCode);
  }
  return switchLocalePath(localeCode);
};
</script>

<style scoped>
.language-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.language-switch__label {
  opacity: 0.7;
}

.language-switch__link {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
  color: inherit;
  transition:
    background-color 0.2s,
    opacity 0.2s;
  opacity: 0.7;
}

.language-switch__link:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.05);
}

.language-switch__link--active {
  opacity: 1;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.08);
}
</style>
