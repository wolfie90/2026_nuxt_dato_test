/**
 * Composable to share alternate locale paths between pages and the LanguageSwitch component.
 * Each page sets the paths for all available locales, and the LanguageSwitch reads them.
 */
export const useAlternateLocales = () => {
  return useState<Record<string, string>>('alternateLocales', () => ({}));
};
