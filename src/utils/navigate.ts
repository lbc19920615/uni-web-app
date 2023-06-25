/**
 * 优化渐变
 * @param updateTheDOMSomehow {Function}
 */

export function spaNavigate(updateTheDOMSomehow: Function) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    return updateTheDOMSomehow();
  }

  // With a transition:
  const transition = document.startViewTransition(async () => {
    await updateTheDOMSomehow();
  });
}
