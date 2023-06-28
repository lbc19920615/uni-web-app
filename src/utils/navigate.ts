/**
 * 优化渐变
 * @param updateTheDOMSomehow {Function}
 */

export function spaNavigate(updateTheDOMSomehow: Function) {
  //#ifdef H5
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    return updateTheDOMSomehow();
  }

  // With a transition:
  const transition = document.startViewTransition(async function() {
    updateTheDOMSomehow();
  });

  transition.finished.finally(function() {})
  //#endif

  //#ifdef MP-WEIXIN
  return updateTheDOMSomehow();
  //#endif
}
