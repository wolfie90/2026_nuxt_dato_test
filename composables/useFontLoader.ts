export const useFontLoader = () => {
  const waitForFonts = async () => {
    try {
      await document.fonts.ready;
      await nextTick();
      await new Promise((r) => requestAnimationFrame(r));
      return true;
    } catch (error) {
      console.error('Error loading fonts:', error);
      return false;
    }
  };

  return {
    waitForFonts,
  };
};
