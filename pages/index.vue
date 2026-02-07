<template>
  <div v-if="data?.home">
    <LayoutGrid>
      <LayoutColumn>
        <h1>{{ data.home.title }}</h1>

        <StructuredText
          :data="data.home.structuredText"
          :customNodeRules="customNodeRules"
          :renderInlineRecord="renderInlineRecord"
          :renderLinkToRecord="renderLinkToRecord"
          :renderBlock="renderBlock"
        />
      </LayoutColumn>
    </LayoutGrid>

    <footer>{{ $t('site.publishedAt', { date: data.home._firstPublishedAt }) }}</footer>
  </div>
</template>

<script setup lang="ts">
import {
  BlocksImageBlock,
  BlocksImageGalleryBlock,
  HeadingWithAnchorLink,
  LazyBlocksVideoBlock,
  LazyCode,
  NuxtLink,
} from '#components';
import { isCode, isHeading } from 'datocms-structured-text-utils';
import {
  type RenderBlockContext,
  type RenderInlineRecordContext,
  type RenderRecordLinkContext,
  StructuredText,
  renderNodeRule,
  toHead,
} from 'vue-datocms';
import { useQuery } from '~/composables/useQuery';
import {
  homeQuery,
  type HomeStructuredTextBlock,
  type HomeStructuredTextRecord,
} from './home-query';

const { locale, t } = useI18n();
const localePath = useLocalePath();
const alternateLocales = useAlternateLocales();

const data = await useQuery(homeQuery, { variables: { locale: locale.value as any } });

// Homepage alternate paths are always the root
alternateLocales.value = { nl: '/', en: '/' };

// Handle missing home page with 404
if (!data.value?.home) {
  throw createError({
    statusCode: 404,
    statusMessage: t('site.pageNotFound'),
    fatal: true,
  });
}

useHead(() => {
  return toHead(data.value?.home?._seoMetaTags || []);
});

const customNodeRules = [
  renderNodeRule(isCode, ({ node, key }) => h(LazyCode, { key, node })),
  renderNodeRule(isHeading, ({ node, key, children }) =>
    h(HeadingWithAnchorLink, { node, key }, () => children),
  ),
];

const renderInlineRecord = ({ record }: RenderInlineRecordContext<HomeStructuredTextRecord>) => {
  switch (record.__typename) {
    case 'PageRecord': {
      const path = record.parent?.slug
        ? `/${record.parent.slug}/${record.slug}`
        : `/${record.slug}`;
      return h(NuxtLink, { href: localePath(path), class: 'pill' }, () => record.title);
    }
  }
};

const renderLinkToRecord = ({
  record,
  children,
}: RenderRecordLinkContext<HomeStructuredTextRecord>) => {
  switch (record.__typename) {
    case 'PageRecord': {
      const path = record.parent?.slug
        ? `/${record.parent.slug}/${record.slug}`
        : `/${record.slug}`;
      return h(NuxtLink, { href: localePath(path) }, () => children);
    }
  }
};

const renderBlock = ({ record }: RenderBlockContext<HomeStructuredTextBlock>) => {
  switch (record.__typename) {
    case 'VideoBlockRecord': {
      return h(LazyBlocksVideoBlock, { data: record });
    }
    case 'ImageBlockRecord': {
      return h(BlocksImageBlock, { data: record });
    }
    case 'ImageGalleryBlockRecord': {
      return h(BlocksImageGalleryBlock, { data: record });
    }
  }
};
</script>
