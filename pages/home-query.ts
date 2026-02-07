import { ImageBlockFragment } from '~/components/blocks/ImageBlock/fragments';
import { ImageGalleryBlockFragment } from '~/components/blocks/ImageGalleryBlock/fragments';
import { VideoBlockFragment } from '~/components/blocks/VideoBlock/fragments';
import { TagFragment } from '~/lib/datocms/commonFragments';
import { type ResultOf, graphql } from '~/lib/datocms/graphql';

/**
 * The GraphQL query that will be executed for the home page.
 *
 * Thanks to gql.tada, the result will be fully typed!
 */
export const homeQuery = graphql(
  /* GraphQL */ `
    query HomePageQuery($locale: SiteLocale) {
      home(locale: $locale) {
        _seoMetaTags {
          ...TagFragment
        }
        title
        _firstPublishedAt
        structuredText {
          value
          blocks {
            ... on RecordInterface {
              id
              __typename
            }
            ... on ImageBlockRecord {
              ...ImageBlockFragment
            }
            ... on ImageGalleryBlockRecord {
              ...ImageGalleryBlockFragment
            }
            ... on VideoBlockRecord {
              ...VideoBlockFragment
            }
          }
          links {
            ... on RecordInterface {
              id
              __typename
            }
            ... on PageRecord {
              title
              slug
              parent {
                slug(locale: $locale)
              }
            }
          }
        }
      }
    }
  `,
  [TagFragment, ImageBlockFragment, ImageGalleryBlockFragment, VideoBlockFragment],
);

type HomeResult = NonNullable<ResultOf<typeof homeQuery>['home']>;

export type HomeStructuredTextRecord = HomeResult['structuredText']['links'][0];
export type HomeStructuredTextBlock = HomeResult['structuredText']['blocks'][0];
