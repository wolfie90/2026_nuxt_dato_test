<template>
  <LayoutGridOverlay />

  <header>
    <h1>{{ $t('site.title') }}</h1>
    <nav>
      <a href="https://www.datocms.com/docs/nuxt"> {{ $t('site.guide') }} </a>
    </nav>
    <LanguageSwitch />
    <DraftModeToggler />
  </header>
  <main><NuxtPage /></main>
</template>

<script setup lang="ts">
import { toHead } from 'vue-datocms';
import { TagFragment } from './lib/datocms/commonFragments';
import { graphql } from './lib/datocms/graphql';
import { DraftModeToggler, LanguageSwitch } from '#components';

const query = graphql(
  /* GraphQL */ `
    query RootQuery {
      _site {
        faviconMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [TagFragment],
);

const data = await useQuery(query);

useHead(() => {
  return toHead(data.value?._site?.faviconMetaTags || []);
});
</script>
